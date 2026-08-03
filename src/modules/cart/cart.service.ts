import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductService } from 'modules/product/product.service';
import { CartRepository } from '@models/index';
import { MESSAGE } from 'common/constant';




@Injectable()

export class CartService {
  constructor(private readonly productService: ProductService,
    private readonly cartRepository: CartRepository
  ) { }

  async createCart(user: any, addToCart: AddToCartDto) {
    const createdCart = await this.cartRepository.create({
      userId: user._id,
      products: [{
        productId: addToCart.productId,
        quantity: addToCart.quantity
      }]
    })
    return createdCart;
  }

  async addToCart(addToCartDto: AddToCartDto, user: any) {
    const productExistance = await this.productService.findOne(addToCartDto.productId)
    const cartExist = await this.cartRepository.getOne({ userId: user._id })

    if (!cartExist) {
      return await this.createCart(user, addToCartDto)
    }

    const index = cartExist.products.findIndex(
      (product) => product.productId.equals(addToCartDto.productId)
    )

    if (index == -1) {
      cartExist.products.push({
        productId: addToCartDto.productId,
        quantity: addToCartDto.quantity
      })
    } else {
      cartExist.products[index].quantity += addToCartDto.quantity;
    }

    return await cartExist.save()
  }


  async removeFromCart(productId: string, user: any) {
    const product = await this.cartRepository.updateOne(
      { userId: user.id, 'products.productId': productId },
      { $pull: { products: { productId } } }
    );
    if (!product)
      throw new NotFoundException(MESSAGE.Product.notFound)

    return true;

  }


  async clearCart(user: any) {
    await this.cartRepository.updateOne({
      userId: user._id
    }, {
      products: []
    })
  }

  async findOne(user:any){
    const cart = await this.cartRepository.getOne({userId:user._id})
    if(!cart)
      throw new NotFoundException(MESSAGE.Cart.notFound)
    return cart;
  }
  
}
