import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import slugify from 'slugify';
import { AbstractRepository } from '@models/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandFactoryService extends AbstractRepository<Brand> {

   constructor(@InjectModel(Brand.name) brandModel: Model<Brand>) {
    super(brandModel);
  }

  createBrand(createBrandDto: CreateBrandDto, user: any) {
    const brand = new Brand();
    brand.name = createBrandDto.name;
    brand.slug = slugify(createBrandDto.name);
    brand.createdBy = user._id;
    brand.updatedBy = user._id;
    brand.logo = createBrandDto.logo;

    return brand;
  }




  
}