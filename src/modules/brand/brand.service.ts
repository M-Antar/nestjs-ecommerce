import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from '@models/index';
import { MESSAGE } from 'common/constant';
import { Types } from 'mongoose';


@Injectable()
export class BrandService {
  constructor(private readonly brandRepository:BrandRepository){

  }
  async create(brand: Brand) {
   const brandExist =  await this.brandRepository.getOne({slug:  brand.slug})
   if(brandExist)
    throw new ConflictException(MESSAGE.Brand.alreadyExist);

    return await this.brandRepository.create(brand);

  }

  findAll() {
    return `This action returns all brand`;
  }

  async findOne(id: string | Types.ObjectId) {
        const brandexist = await this.brandRepository.getOne({_id:id})

       if(!brandexist)
        throw new NotFoundException(MESSAGE.Brand.notFound)

       return brandexist
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
