import { PartialType } from '@nestjs/mapped-types';
import { CreatProductDto } from './create-product.dto';


export class UpdateProductDto extends PartialType(CreatProductDto) {}
