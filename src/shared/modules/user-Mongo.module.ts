import { Admin, AdminRepository, adminSchema, Customer, CustomerRepository, customerSchema, Seller, SellerRepository, sellerSchema, User, UserReposiroty, userSchema } from "@models/index";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          { name: Seller.name, schema: sellerSchema },
          { name: Customer.name, schema: customerSchema },
          { name: Admin.name, schema: adminSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [SellerRepository, AdminRepository, CustomerRepository,UserReposiroty],
  exports:[SellerRepository, AdminRepository, CustomerRepository,UserReposiroty]


})
export class UserMongoModule {}