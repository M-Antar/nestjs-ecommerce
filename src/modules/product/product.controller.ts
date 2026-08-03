import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';

import { UpdateProductDto } from './dto/update-product.dto';
import { CreatProductDto } from './dto/create-product.dto';
import { Auth, Public, User } from 'common/decorators';
import { ProductFactoryService } from './factory';
import { MESSAGE } from 'common/constant';
import { ProductRepository } from '@models/product/product.repository';
import { Product } from './entities/product.entity';

@Auth(['Admin','Seller'])
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    private readonly productFactoryService:ProductFactoryService,
    private readonly productRepository : ProductRepository
  ) {}

  @Post()
  async create(@Body() createProductDto: CreatProductDto,@User() user:any) {
   const product =  this.productFactoryService.createProduct(createProductDto,user);

   const createdProduct = await this.productService.create(product,user);

  

     return {success:true,message:MESSAGE.Product.created,data:createdProduct}
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);

      return {success:true,message:MESSAGE.Product.created,data:product}


  }

  @Patch(':id')
  async update(@Param('id') id: string, product:Product) {
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
