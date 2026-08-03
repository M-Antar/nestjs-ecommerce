import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Coupon, CouponReposiroty, couponSchema, Order, OrderRepository, OrderSchema } from '@models/index';
import { CartModule } from 'modules/cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'modules/product/product.module';
import { UserMongoModule } from '@shared/modules';
import { PaymentService } from 'common/services/payment/payment.service';

@Module({
  imports:[CartModule,
    ProductModule
    ,
    UserMongoModule,
    MongooseModule.forFeature([{name:Order.name,schema:OrderSchema},{name:Coupon.name,schema:couponSchema}])],
  controllers: [OrderController],
  providers: [OrderService,OrderRepository,CouponReposiroty,PaymentService],
})
export class OrderModule {}
