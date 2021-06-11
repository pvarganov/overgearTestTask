import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('accounts/payment')
    async payment(
        @Body() data: { paymentId: string; email: string; amount: number }
    ): Promise<Boolean> {
        console.log(data);
        return this.userService.payment(data);
    }

    @Post('accounts/transfer')
    async transfer(
        @Body() data: { userFrom: number; userTo: number; amount: number }
    ): Promise<Boolean> {
        return this.userService.transfer(data);
    }
}
