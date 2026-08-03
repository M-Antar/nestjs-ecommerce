import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { DiscountType } from "common/types";
import { SchemaTypes, Types } from "mongoose";




@Schema({timestamps:true,toJSON:{virtuals:true}})   
export class Product {
  // ========== string
  @Prop({ type: String, required: true, trim: true })
  name!: string;

  @Prop({ type: String, required: true, trim: true })
  slug!: string;

  @Prop({ type: String, required: true, trim: true })
  description!: string;

  // ========== ids
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  categoryId!: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Brand', required: true })
  brandId!: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true }) // Customer - Hr - Sales - Seller - Admin
  createdBy!: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy!: Types.ObjectId;

  // ========== numbers
  @Prop({ type: Number, required: true, min: 1 }) // negative
  price!: number;

  @Prop({ type: Number, required:false,min:0 , default : 0}) // negative
  discountAmount!: number; // >> 20 fixedAmount - percentage >> 14000 - 50% = 7000

  @Prop({ type: String, enum: DiscountType, default: DiscountType.fixedAmount }) // negative
  discountType!: DiscountType;


    @Virtual({
    get: function (this:Product) { 
        if(this.discountType == DiscountType.fixedAmount)
            return this.price - this.discountAmount

      return this.price- this.price * (this.discountAmount / 100 ) ;
    },
  })
  finalPrice!: number; // virtual field to calc final price and autocomplete

  @Prop({ type: Number, default: 1, min: .0 }) // negative
  stock!: number;

  @Prop({ type: Number, min: .0 }) // negative
  sold!: number;

  @Prop({ type: [String]}) // negative
  colours!:string[];

  @Prop({ type: [String]}) // negative
  sizes!:string[];
}

export const productSchema = SchemaFactory.createForClass(Product)

