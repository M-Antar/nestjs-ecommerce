import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory';
import { Auth, Roles, User } from 'common/decorators';
import { AuthGuard } from 'common/guards';
import { RolesGuard } from 'common/guards/roles.guard';
import { MESSAGE } from 'common/constant';




@Controller('brand')
// @Roles(['Admin'])
// @UseGuards(AuthGuard,RolesGuard)
@Auth(['Admin']) 
//composite decorator
export class BrandController {
  constructor(private readonly brandService: BrandService,
    private readonly branFactoryService:BrandFactoryService
  ) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto,@User() user:any) {
    const brand =  this.branFactoryService.createBrand(createBrandDto,user);
    const createdBrand = await this.brandService.create(brand)
       return {success:true,message:MESSAGE.Brand.created,data:createdBrand}
  }

  @Get()
  findAll() {
    // return this.brandService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string,) {
    const brand = await this.branFactoryService.getOne({_id:id})
    if(!brand)
      throw new NotFoundException(MESSAGE.Brand.notFound)

    return {success:true,message:MESSAGE.Brand.created,data:brand}

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
