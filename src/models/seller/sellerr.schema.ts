import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role', toJSON: { virtuals: true } })
export class Seller {
    
    readonly _id?:Types.ObjectId;
  
    userName?: string;

    email?: string;

    password?: string;

    @Prop({type:String,required:true})
    whatsappLink?:string; //the plus for seller 

} //for auto complete and  props as follow role discpmenator

export const sellerSchema = SchemaFactory.createForClass(Seller)