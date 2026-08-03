import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { DiscountType } from "common/types";
import { Types } from "mongoose";


export class CreatProductDto {


@IsString()
@IsNotEmpty()
@MinLength(3)
name!: string;


@IsString()
@IsNotEmpty()
@MinLength(10)
description!: string;

@IsMongoId()
@IsNotEmpty()
categoryId!: Types.ObjectId;

@IsMongoId()
@IsNotEmpty()
brandId!: Types.ObjectId;

@IsNumber()
@IsNotEmpty()
price!: number;


@IsNumber()
@IsNotEmpty()
@IsOptional()
discountAmount!: number;

@IsOptional()
@IsString()
@IsEnum(DiscountType)
discountType!: DiscountType;

@IsNumber()
@IsOptional()
stock!: number;


@IsArray()
@IsString({each:true})
colors!: string[]; // red - green

@IsArray()
@IsString({each:true})
sizes!: string[]; // 1x - 2x - "45"
}