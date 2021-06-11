import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { users } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('accounts/payment')
  async payment(
    @Body() data: { paymentId: string; email: string; amount: number }
  ): Promise<String> {
    console.log(data);
    return this.appService.payment(data);
  }

  @Post('accounts/transfer')
  async transfer(
    @Body() data: { userFrom: number; userTo: number; amount: number }
  ): Promise<String> {
    console.log(data);
    return this.appService.transfer(data);
  }
}
