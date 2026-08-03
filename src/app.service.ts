import { Injectable } from '@nestjs/common';

@Injectable()
//scope : 
 //lifetime of this obj default : start(inistance):bootstraped  end:(shutdown)
 //request-scope : start and end by every new req
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  login(){
    const accessToken="Done"
    return accessToken;
  }
  register(){
     const reg="Done"
    return reg;
  }
}
