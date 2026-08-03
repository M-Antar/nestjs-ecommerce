import { Module } from '@nestjs/common';
import { UserMongoModule } from '@shared/index';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'common/index';
import { AuthFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[
    UserMongoModule
  ],

  controllers: [AuthController],
  providers: [AuthService,AuthFactoryService,JwtService]
  // providers: [AuthService,{provide:APP_FILTER,useClass:HttpExceptionFilter}],

  //APPLY (BIND) FILTER ON ALL MODULE
})
export class AuthModule {}


//we impoert customer repository
//customerrepository need customer model 
//customer model is discimnator of user model 
//so we import usermodel and its descminiator that is customermodel