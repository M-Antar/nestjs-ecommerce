import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role', toJSON: { virtuals: true } })
export class Admin {

    readonly _id?:Types.ObjectId;

    userName?: string;

    email?: string;

    password?: string;

 
} //for auto complete and  props as follow role discpmenator

export const adminSchema = SchemaFactory.createForClass(Admin)