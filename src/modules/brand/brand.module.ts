import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactoryService } from './factory';
import { Brand, BrandRepository, brandSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';

@Module({
  imports:[
    UserMongoModule,
    MongooseModule.forFeature([{name:Brand.name,schema:brandSchema}])],
  controllers: [BrandController],
  providers: [BrandService,BrandFactoryService,BrandRepository,JwtService],
  exports: [BrandService,BrandFactoryService,BrandRepository,JwtService]
})
export class BrandModule {}
