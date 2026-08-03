import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UpdateProductDto } from './dto/update-product.dto';
import { AdminRepository, BrandRepository, Category, CustomerRepository, SellerRepository } from '@models/index';
import { CreatProductDto } from './dto/create-product.dto';
import { ProductRepository } from '@models/product/product.repository';
import { Product } from './entities/product.entity';
import { CategoryService } from 'modules/category/category.service';
import { MESSAGE } from 'common/constant';
import { BrandService } from 'modules/brand/brand.service';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository:ProductRepository,
    private readonly categoryService : CategoryService,
    private readonly brandService : BrandService

  ){}

  async create(product: Product,user:any) {
       //check existance => category 
       //check existance => brand
       //check existance => product (for no duplicates for same seller)

       //service>repository 
       //import module inside its service check and throw

      await this.categoryService.findOne(product.categoryId )

      await this.brandService.findOne(product.brandId)

      const productExist = await this.productRepository.getOne({slug:product.slug,
        $or:[{createdBy:user._id},{updatedBy:user._id}]
      })

      if(productExist){
        return await this.update(productExist._id,product)
      }
        

      return await this.productRepository.create(product);

     
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: string|Types.ObjectId) {
    const productExist = await this.productRepository.getOne({_id:id})
    if(!productExist)
          throw new NotFoundException(MESSAGE.Product.notFound)
      return productExist;
  }

  async update(id: string| Types.ObjectId, product: Product) {
    const productExist = this.findOne(id)
        
        // const colours = new Set<string>(productExist.colours);
        // for(const colour of product.colors){
        //   colours.add(colour);
        // }

        // product.colors=Array.from(colours);
        //LOGIC IF YOU NEED CRETAE TO ADD ON THE OLD



        return await this.productRepository.updateOne({_id:id},product,{new:true})
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
