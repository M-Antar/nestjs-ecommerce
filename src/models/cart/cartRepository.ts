import { AbstractRepository } from "@models/abstract.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Cart } from "./cart.schema";

@Injectable()
export class CartRepository extends AbstractRepository<Cart>{

    constructor(@InjectModel(Cart.name) private readonly cartModel : Model<Cart>){
        super(cartModel)
    }
}