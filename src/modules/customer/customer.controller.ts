import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from 'common/guards';
import { RolesGuard } from 'common/guards/roles.guard';
import { Public, Roles } from 'common/decorators';


@Controller('customer')
@UseGuards(AuthGuard,RolesGuard)
@Roles(['Admin'])

export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  // @UseGuards(AuthGuard,new RolesGuard(['user','customer']))
  //seperated decorator to pass parameter
  @Public()
  getProfile(@Req() req:any){
    return {message:'done',success:true,data : {user:req.user}}
    
  }

}