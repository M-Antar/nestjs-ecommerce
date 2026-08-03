import { Injectable } from '@nestjs/common';
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
}