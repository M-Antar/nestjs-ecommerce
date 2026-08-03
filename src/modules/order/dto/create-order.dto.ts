import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { PaymentMethod } from "common/types";
import { Types } from "mongoose";

class CouponDetailsDto {
  @IsMongoId()
  couponId!: Types.ObjectId;

  @IsNumber()
  discountAmount!: number;

  @IsString()
  @IsOptional()
  code?: string;
}

class AddressDto {
  @IsString()
  street!: string;

  @IsString()
  city!: string;

  @IsString()
  country!: string;

  @IsString()
  code!: string;

  @IsString()
  phoneNumber!: string;
}

export class CreateOrderDto {
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;

  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod!: PaymentMethod;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CouponDetailsDto)
  couponDetails?: CouponDetailsDto;

  //   productsId?:{
  //     productId:string,
  //     quantity:number
  //   }[];
  //   //option buy now fe
}