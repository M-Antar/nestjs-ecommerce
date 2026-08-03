import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth, Public, PUBLIC, User } from 'common/decorators';



@Controller('order')
@Auth(['Admin','Customer'])
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto,@User() user:any) {
     const result = await this.orderService.create(createOrderDto,user);
     if(result instanceof Array){
      return {success:false,message:'Order Failed',data:result}
     }
      return {success:true,message:'Order Created Successfully',data:result}
     
  }

  @Post(':id')
  async creataSeeion(@Param('id') OrderId: string,@User() user:any){
    const session = await this.orderService.createCheckoutSession(OrderId,user)
      return {success:true,message:'session Created Successfully',data:session}
  }


  
  @Post('refund/:id')
  async refundOrder(@Param('id') OrderId: string,@User() user:any){
    const session = await this.orderService.refundOrder(OrderId,user)
      return {success:true,message:'session Created Successfully',data:session}
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }


}

