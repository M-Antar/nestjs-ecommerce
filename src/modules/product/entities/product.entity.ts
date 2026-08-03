import { DiscountType } from "common/types";
import { Types } from "mongoose";


export class Product {
  readonly _id!: Types.ObjectId;
  name!: string;

  slug!: string;

  description!: string;
  categoryId!: Types.ObjectId;

  brandId!: Types.ObjectId;

  createdBy!: Types.ObjectId;

  updatedBy!: Types.ObjectId;
  price!: number;

  discountAmount!: number;

  discountType!: DiscountType;

  finalPrice!: number; // virtual field

  stock!: number;

  sold!: number;

  colors!: string[]; // red - green

  sizes!: string[]; // 1x - 2x - "45"
}