import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository:CategoryRepository){}
 async create(category: Category) {
   const categoryExist= await this.categoryRepository.getOne({slug:category.slug})

   if(categoryExist){
    throw new ConflictException('category already exist')
   }

   return await this.categoryRepository.create(category)
   
  }

 async findAll(query: any) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  return this.categoryRepository.getAll({}, {}, { skip, limit });
}

  async findOne(id: string | Types.ObjectId) {
    const category = await this.categoryRepository.getOne({_id:id},{},{
      populate:[{path:'createdBy'},{path:"updatedBy"}]
    })
       if(!category)
         throw new NotFoundException("category not found")
       return category
  }

  async update(id: string, category: Category) {


   const existingCategory = await this.categoryRepository.getOne({ _id: id });

  if (!existingCategory) {
    throw new NotFoundException('Category not found');
  }

  const categorySlugExist = await this.categoryRepository.getOne({
  slug: category.slug,
  _id:{$ne:id}
}); 
//to follow approch put when send all data to update one field not make unupdated make conflict 

  if(categorySlugExist){
    throw new ConflictException('category already exist')
  }


  return await this.categoryRepository.updateOne({_id:id},category,{new:true});




  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
