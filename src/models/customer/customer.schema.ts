import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role', toJSON: { virtuals: true } })
export class Customer {

    readonly _id?:Types.ObjectId;

    userName?: string;

    email?: string;

    password?: string;

    otp?:string;

    otpExpiry?:string;

    isVerified?:boolean;
    
    @Prop({type:Date})
    dob?:Date;

 
} //for auto complete in writing code not for mongoose  and  props as follow role discpmenator

export const customerSchema = SchemaFactory.createForClass(Customer)

