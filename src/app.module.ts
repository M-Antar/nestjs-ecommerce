import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, adminSchema, Seller, sellerSchema, User, userSchema } from './models';
import { Product } from './modules/product/entities/product.entity';
import { ProductModule } from './modules/product/product.module';
import { SellerModule } from './modules/seller/seller.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { CommonModules } from '@shared/modules';
import { CouponModule } from './modules/coupon/coupon.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';



@Module({
  imports: [ConfigModule.forRoot({ load:[devConfig],isGlobal: true, }),
   MongooseModule.forRootAsync({
    inject:[ConfigService],
    useFactory :(ConfigService:ConfigService) => ({
      uri:ConfigService.get('db').url
    })
  })  ,
  CommonModules,
  AuthModule,
ProductModule,
SellerModule,
CustomerModule,
CategoryModule,
BrandModule,
CouponModule,
CartModule,
OrderModule],
  controllers: [AppController],
  providers: [AppService, Product],
})
export class AppModule { }
