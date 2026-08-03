import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from 'modules/product/product.module';
import { Cart, CartRepository, cartSchema } from '@models/index';
import { Mongoose } from 'mongoose';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserMongoModule } from '@shared/modules';

@Module({
  imports:[ProductModule,UserMongoModule,MongooseModule.forFeature([{name:Cart.name,schema:cartSchema}])],
  controllers: [CartController],
  providers: [CartService,CartRepository,JwtService,ConfigService],
  exports:[CartService,CartRepository]
})
export class CartModule {}
