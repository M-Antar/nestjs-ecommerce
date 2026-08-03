import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { CouponReposiroty } from '@models/index';
import { MESSAGE } from 'common/constant';

@Injectable()
export class CouponService {
  constructor(private readonly couponReposiroty:CouponReposiroty){}
  async create(coupon: Coupon) {
    const couponExist = await this.couponReposiroty.getOne({code:coupon.code,active:true})
    if(couponExist)
      throw new ConflictException(MESSAGE.Coupon.alreadyExist)
   return await this.couponReposiroty.create(coupon);
    
  }

  findAll() {
    return `This action returns all coupon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
