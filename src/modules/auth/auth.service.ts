import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { CustomerRepository, UserReposiroty } from '@models/index';
import { Customer } from './entities/auth.entity';
import { sendMail } from 'common/index';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()

export class AuthService {

  constructor(private readonly customerRepository : CustomerRepository,private readonly jwtService:JwtService,private readonly configService:ConfigService,private readonly userRepository:UserReposiroty){}

  async register(customer: Customer) {
    const customerExist = await this.customerRepository.getOne({email:customer.email})
    if(customerExist){
      throw new ConflictException('user already exist')
    }

    const createdCustomer = await this.customerRepository.create(customer)
    //send email

   sendMail({
  to: customer.email,
  subject: 'confirm email',
  html: `<h1>Your OTP is ${customer.otp}</h1>`,
});
    const {password,otp,otpExpiry,...customerObj} = JSON.parse(JSON.stringify(createdCustomer)) ;
    //created customer is object as doc type 
    //rest operator (...)
    //deep copy as object to can delete fields
    
    return customerObj as Customer;
  }




  async login(loginDto:LoginDto){

    const customerExist = await this.userRepository.getOne({email:loginDto.email});

    const match = await bcrypt.compare(loginDto.password,customerExist?.password||'');


    if(!customerExist){
      throw new UnauthorizedException('invalid credintials');
    }

    if(!match){
      throw new UnauthorizedException('invalid credintials');
    }

    //generate token 

    const token = this.jwtService.sign({ _id: customerExist._id,
      role:'Customer',
      email:customerExist.email
    },{
      secret:this.configService.get('access').jwt_secret,expiresIn:'1d'
    })

    return token;

  }
}
