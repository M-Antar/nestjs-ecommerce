import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '@models/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { Coupon } from '../entities/coupon.entity';

@Injectable()
export class CouponFactoryService extends AbstractRepository<Coupon> {

   constructor(@InjectModel(Coupon.name) brandModel: Model<Coupon>) {
    super(brandModel);
  }

  createCoupon(createCouponDto: CreateCouponDto, user: any) {
    const coupon = new Coupon();
    coupon.code = createCouponDto.code;

  coupon.disscountAmount = createCouponDto.disscountAmount;
  coupon.disscountType = createCouponDto.disscountType;
    coupon.assignedTo = createCouponDto.assignedTo?.map((id) => ({
      customerId: id,
      count: 0,
    })) || [];
    coupon.usedBy = [];
    coupon.createdBy = user._id;
    coupon.updatedBy = user._id;
    coupon.fromDate=createCouponDto.fromDate;
    coupon.toDate=createCouponDto.toDate;
    coupon.active=createCouponDto.active;

    return coupon;
  }




  
}