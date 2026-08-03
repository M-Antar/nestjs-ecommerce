import { Module } from '@nestjs/common';
import { UserMongoModule } from '@shared/index';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductFactoryService } from './factory';
import { ProductRepository } from '@models/product/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from '@models/product/product.schema';
import { CategoryService } from 'modules/category/category.service';
import { Brand, BrandRepository, brandSchema } from '@models/index';
import { CategoryModule } from 'modules/category/category.module';
import { BrandModule } from 'modules/brand/brand.module';

@Module({
    imports:[
      UserMongoModule,MongooseModule.forFeature([{name:Product.name,schema:productSchema}]),CategoryModule,BrandModule
    ],
  controllers: [ProductController],
  providers: [ProductService,ProductFactoryService,ProductRepository],
  exports:[ProductService,ProductRepository]
})
export class ProductModule {}
