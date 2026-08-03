import { Schema } from "@nestjs/mongoose";
import { DiscountType } from "common/types";
import { Types } from "mongoose";


@Schema({timestamps:true})
export class UserCoupon{
    customerId!:Types.ObjectId;
    count!:number
}


export class Coupon {
    
    readonly _id!:Types.ObjectId;
    code!:string;

    disscountAmount!:number;

    disscountType!:DiscountType;

    fromDate!:Date;

    toDate!:Date;

    createdBy!:Types.ObjectId;

    updatedBy!:Types.ObjectId;

    active!:boolean;

    usedBy!:UserCoupon[]

    //assigned to sum ids private
    assignedTo!:UserCoupon[]
}

