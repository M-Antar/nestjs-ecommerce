import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DiscountType } from "common/types";
import { SchemaType, SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class UserCoupon{
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    customerId!:Types.ObjectId;
       @Prop({ type: Number, default: 0 })
    count!:number
}

@Schema({timestamps:true})
export class Coupon {

    readonly _id!:Types.ObjectId;
    @Prop({type:String,required:true})
    code!:string;

    @Prop({type:Number,required:true})
    disscountAmount!:number;

    @Prop({type:String,enum:DiscountType,default:DiscountType.fixedAmount})
    disscountType!:DiscountType;

    @Prop({type:Date,required:true})
    fromDate!:Date;

    @Prop({type:Date,required:true})
    toDate!:Date;

    @Prop({type:SchemaTypes.ObjectId,ref:'User',required:true})
    createdBy!:Types.ObjectId;

    @Prop({type:SchemaTypes.ObjectId,ref:'User',required:true})
    updatedBy!:Types.ObjectId;

    @Prop({type:Boolean,default:true})
    active!:boolean;

   @Prop({ type: [UserCoupon], default: [] })
    usedBy!: UserCoupon[];

    // assigned to sum ids private
    @Prop({ type: [UserCoupon], default: [] })
    assignedTo!: UserCoupon[];
}

export const couponSchema = SchemaFactory.createForClass(Coupon)