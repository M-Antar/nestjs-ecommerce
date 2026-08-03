import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';

import { HttpExceptionFilter } from 'common/index';
import { RegisterDTO } from './dto/register.dto';
import { AuthFactoryService } from './factory';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
// @UseFilters(HttpExceptionFilter) applied on all controller
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly authFactoryService:AuthFactoryService) {}

 @Post('/register')
// @UseFilters(HttpExceptionFilter) only for this api
  async register(@Body() registerDTO: RegisterDTO) {
   const customer = await this.authFactoryService.createCustomer(registerDTO);
   const createdCustomer = await this.authService.register(customer);
   return {message  :'Customer Registered Successfully',success:true,data:createdCustomer}
  }

  @Post('/login')
  async login(@Body() loginDto:LoginDto){
   const token = await this.authService.login(loginDto);
       return {message  :'login Successfully',success:true,data:token}


  }

}
