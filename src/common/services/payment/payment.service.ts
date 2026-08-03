import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    private stripe: Stripe;

    constructor(private readonly configService: ConfigService) {
        const secretKey = this.configService.get('stripe.secret_key') as string;
        if (!secretKey) {
            throw new Error('STRIPE_SECRET_KEY is not defined');
        }
        this.stripe = new Stripe(secretKey);
    }

    async checkoutSession({
        success_url = this.configService.get('success_url') as string,
        cancel_url = this.configService.get('cancel_url') as string,
        mode = 'payment',
        discounts = [],
        metadata = {},
        line_items,
        customer_email,
    }: Stripe.Checkout.SessionCreateParams) {
        const session = await this.stripe.checkout.sessions.create({
            customer_email,
            success_url,
            cancel_url,
            line_items,
            mode,
            discounts,
            metadata,
        });

        return session;
    }


    // async createCoupon(data: Stripe.CouponCreateParams) {

    //     const coupon = await this.stripe.coupons.create(data);

    //     return coupon;
    // }
    // manulay but we dont need we already make applyCoupon func in order creation


    async createPaymentMethod(data: Stripe.PaymentMethodCreateParams) {

        const method = await this.stripe.paymentMethods.create(data);
        console.log(method)

        return method;
    }

    async createPaymentInten(data: Stripe.PaymentIntentCreateParams) {

        const intent = await this.stripe.paymentIntents.create(data);

        console.log(intent)

        return intent;
    }


    async retrivePaymentMethod(id: string) {
        const intent = await this.stripe.paymentIntents.retrieve(id)
        return intent
    }

    async confirmPaymentIntent(id: string) {
        const intent = await this.retrivePaymentMethod(id)

        if (!intent)
            throw new BadRequestException("invalid payment intent ID")

        const confirmIntent = await this.stripe.paymentIntents.confirm(intent.id)

        console.log(confirmIntent)


        return confirmIntent;
    }

    async createRefundPayment(id: string) {
        const intent = await this.retrivePaymentMethod(id)

        if (!intent)
            throw new BadRequestException("invalid payment intent ID")

        const refund = await this.stripe.refunds.create({
            payment_intent: id,
        });

        return refund ;

    }



}