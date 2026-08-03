import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponFactoryService } from './factory';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponReposiroty, couponSchema } from '@models/index';
import { UserMongoModule } from '@shared/modules';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Coupon.name, schema: couponSchema },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService,CouponFactoryService,CouponReposiroty],
})
export class CouponModule {}
