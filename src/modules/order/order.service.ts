import { CouponReposiroty, OrderRepository } from '@models/index';
import { ProductRepository } from '@models/product/product.repository';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CartService } from 'modules/cart/cart.service';
import { Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DiscountType, OrderStatus, PaymentMethod } from 'common/types';
import { MESSAGE } from 'common/constant';
import path from 'path';
import { PaymentService } from 'common/services/payment/payment.service';
import Stripe from 'node_modules/stripe/esm/stripe.esm.node';

@Injectable()
export class OrderService {

  constructor(private readonly cartService: CartService,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly couponReposiroty: CouponReposiroty,
    private readonly paymentService: PaymentService
  ) {


  }


  async create(createOrderDto: CreateOrderDto, user: any) {
    const userCart = await this.cartService.findOne(user)
    let errorArr: { productId: Types.ObjectId; reason: string }[] = [];
    let successProd: {
      productId: Types.ObjectId, quantity: number, price: number, discount: number, totalPrice: number
    }[] = [];



    for (const product of userCart.products) {
      const productExist = await this.productRepository.getOne({ _id: product.productId })

      if (!productExist) {
        errorArr.push({
          productId: product.productId,
          reason: "Product Not Found"
        })
        continue;
      }

      if (product.quantity > productExist.stock) {
        errorArr.push({
          productId: product.productId,
          reason: "Product Stock Not Enough"
        })
        continue;
      }

      successProd.push({
        productId: product.productId,
        quantity: product.quantity,
        price: productExist.finalPrice,
        discount: productExist.discountAmount,
        totalPrice: productExist.finalPrice * product.quantity,
      });

    }

    if (errorArr.length > 0) {
      return errorArr;
    }

    const subtotal = successProd.reduce(
      (acc, cur) => acc + cur.totalPrice,
      0,
    );

    let totalAmount = subtotal;

    if (createOrderDto.couponDetails) {
      totalAmount = await this.applyCoupon(
        createOrderDto.couponDetails.couponId,
        user._id,
        subtotal,
      );
    }

    const order = await this.orderRepository.create({
      userId: user._id,
      products: successProd,
      address: createOrderDto.address,
      paymentMethod: createOrderDto.paymentMethod,
      coupon: createOrderDto.couponDetails,
      totalAmount,
    });
    
    this.cartService.clearCart(user)

    

    return order;
  }


  async refundOrder(orderId: string, user: any) {
    const order = await this.orderRepository.getOne({
      _id: orderId,
      userId: user._id,
     paymentMethod: PaymentMethod.CREDIT_CARD
    })

    if (!order)
      throw new NotFoundException(MESSAGE.Order.notFound)

    if (!order.intentId)
      throw new BadRequestException("No Payment Intent Found For This Order")

    const refund = await this.paymentService.createRefundPayment(order.intentId)

    await this.orderRepository.findOneAndUpdate(
      { _id: orderId }, // filter
      {
        status: OrderStatus.CANCELLED,
        refundId: refund.id,
        refundAt: new Date(),
        $unset: {
          intentId: 1,
        },
      },
    );

    return order
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private async applyCoupon(
    couponId: Types.ObjectId,
    userId: Types.ObjectId,
    subtotal: number,
  ): Promise<number> {

    const coupon = await this.couponReposiroty.getOne({
      _id: couponId,
    });

    if (!coupon) {
      throw new NotFoundException("Coupon Not Found");
    }

    if (!coupon.active) {
      throw new BadRequestException("Coupon is inactive");
    }

    const now = new Date();

    if (now < coupon.fromDate || now > coupon.toDate) {
      throw new BadRequestException("Coupon has expired");
    }

    if (coupon.assignedTo.length > 0) {
      const assigned = coupon.assignedTo.find(
        x => x.customerId.toString() === userId.toString(),
      );

      if (!assigned) {
        throw new ForbiddenException(
          "You are not allowed to use this coupon",
        );
      }
    }

    const used = coupon.usedBy.find(
      x => x.customerId.toString() === userId.toString(),
    );

    if (used && used.count >= 1) {
      throw new BadRequestException("Coupon already used");
    }

    let total = subtotal;

    if (coupon.disscountType === DiscountType.percentage) {
      total -= subtotal * coupon.disscountAmount / 100;
    } else {
      total -= coupon.disscountAmount;
    }

    return Math.max(total, 0);
  }


  async createCheckoutSession(orderId: string, user: any) {
    const orderExist = await this.orderRepository.getOne(
      {
        _id: orderId,
        userId: user._id,
        status: OrderStatus.PENDING,
        paymentMethod: PaymentMethod.CREDIT_CARD,
      },
      {},
      { populate: ['userId', 'products.productId', 'coupon.couponId'] }
    );

    if (!orderExist)
      throw new NotFoundException(MESSAGE.Order.notFound)

    const amount = orderExist.totalAmount;
    const lineItems = [{
      price_data: {
        currency: 'egp',
        product_data: {
          name: `Order ${user.name}`,
          description: `Payment for order at address ${orderExist.address}`
        },
        unit_amount: amount * 100
      },

      quantity: 1
    }]

    // let discounts : Stripe.Checkout.SessionCreateParams.Discount[]=[];
    // if(orderExist.coupon){
    //   const coupon = await this.paymentService.createCoupon({
    //     duration:'once',
    //     currency:'egp',
    //     percent_off:orderExist.coupon.discountAmount

    //   })
    //   discounts.push({coupon:coupon.id})
    // }
    //manulay but we dont need we already make applyCoupon func in order creation


    const session = await this.paymentService.checkoutSession({
      customer_email: user.email,
      line_items: lineItems,
      mode: "payment",
      discounts: [],
      metadata: { orderId: orderId }

    })

    const method = await this.paymentService.createPaymentMethod({
      type: 'card',
      card: { token: 'tok_visa' },

    })

    const intent = await this.paymentService.createPaymentInten({
      amount: orderExist.totalAmount * 100,
      currency: 'egp',
      payment_method: method.id,
      payment_method_types: ['card']
    })

    orderExist.intentId = intent.id;
    await orderExist.save();

    this.paymentService.confirmPaymentIntent(intent.id)
    return session;


  }
}
