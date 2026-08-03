
import { CustomerRepository, UserReposiroty } from '@models/index';
import { Injectable, CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PUBLIC } from 'common/decorators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private readonly jwtService:JwtService,private readonly configService:ConfigService,private readonly userRepository:UserReposiroty,private readonly reflector:Reflector){}
   async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
       
    try {
      //first if public pass all auth roles
         const publicVal =  this.reflector.get(PUBLIC,context.getHandler())
      
         if(publicVal)
            return true

    const request = context.switchToHttp().getRequest();
    const {authorization} = request.headers;
    const payload = this.jwtService.verify<{_id:string,role:string,email:string}>(authorization,{secret:this.configService.get('access').jwt_secret});
    const userExist = await this.userRepository.getOne({_id:payload._id})
    if(!userExist){
        throw new NotFoundException('user not found ')
    }
    request.user=userExist;
    return true;
    //act as next -> return true
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}
