
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Customer } from "modules/auth/entities/auth.entity";





@Injectable()
export class CustomerRepository extends AbstractRepository<Customer> {
  constructor(@InjectModel(Customer.name) customerModel: Model<Customer>) {
    super(customerModel);
  }
}