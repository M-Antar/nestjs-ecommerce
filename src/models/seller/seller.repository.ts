import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Seller } from "./sellerr.schema";
import { Model } from "mongoose";

@Injectable()
export class SellerRepository extends AbstractRepository<Seller> {
  constructor(@InjectModel(Seller.name) private readonly sellerModel: Model<Seller>) {
    super(sellerModel);
  }
}