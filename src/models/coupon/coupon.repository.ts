
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Coupon } from "./copoun.schema";





@Injectable()
export class CouponReposiroty extends AbstractRepository<Coupon> {
  constructor(@InjectModel(Coupon.name) couponModel: Model<Coupon>) {
    super(couponModel);
  }
}