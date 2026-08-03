import { Body, Controller, Get, HttpCode, HttpException, Param, Post, Req, Res } from '@nestjs/common';
import type { Request } from 'express';
import { AppService } from './app.service';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} //inject l appservice inside appcontroller 
   

  @Post('/auth/login/:id')
  // @HttpCode(204)
  login(@Req() req: Request, @Body() body: any , @Param('id') id:string) {
    const result = this.appService.login();
    console.log(body)
    console.log(id)
    if(true){
      throw new HttpException("kkk",222)
      //notfoundexc
      //unauthoexcep
    }
    return { message: 'Done', success: true, data: { result } };
  }
}

// or , @Body("email") email: string