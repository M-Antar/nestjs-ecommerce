import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, Length, MinDate } from "class-validator";
import { IsValidDiscountAmount, IsValidToDate } from "common/decorators";
import { DiscountType } from "common/types";
import { Types } from "mongoose";
import { isValidDate } from "rxjs/internal/util/isDate";

export class CreateCouponDto {


    @IsString()
    @IsNotEmpty()
    @Length(5,5)
    code!:string;

    @IsNumber()
    @IsNotEmpty()
    @IsValidDiscountAmount()
    disscountAmount!:number;


    @IsString()
    @IsEnum(DiscountType)
    disscountType!:DiscountType;


    @Type(() => Date)
    @IsDate()
    @MinDate(new Date(Date.now()-24*60*60*1000))
    fromDate!:Date;
    //minus 1 day to make today included in coupon

    @Type(() => Date)
    @IsDate()
    @IsValidToDate()
    toDate!:Date;

    @IsBoolean()
    active!:boolean;

    @IsArray()
    @IsMongoId({each:true})
    assignedTo!:Types.ObjectId[]
}
