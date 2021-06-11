import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { Bills } from '../bills/bills.entity';
import { Transactions } from '../transactions/transactions.entity';
import { getConnection } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async payment(data: { paymentId: string; email: string; amount: number }): Promise<Boolean> {
        if (!data.paymentId) {
            return false
        }

        const manager = getConnection().manager;
        const user = await this.usersRepository.findOne({ relations: ["bill"], where: { email: data.email } });

        await manager.transaction(async manager => {
            const bill = await manager.update(Bills, {
                userId: user.id
            }, {
                balance: () => `balance + ${data.amount}`
            });

            await manager.insert(Transactions, {
                accountTo: user.bill.id,
                type: <any>'refill',
                amount: data.amount,
                paymentId: data.paymentId
            });
        });

        return true;
    }

    async transfer(data: { userFrom: number; userTo: number; amount: number }): Promise<Boolean> {
        const manager = getConnection().manager;

        await manager.transaction(async manager => {
            await manager.update(Bills, { userId: data.userTo }, { balance: () => `balance + ${data.amount}` });
            await manager.update(Bills, { userId: data.userFrom }, { balance: () => `balance - ${data.amount}` });
            await manager.insert(Transactions, {
                accountFrom: data.userFrom,
                accountTo: data.userTo,
                type: <any>'transfer',
                amount: data.amount,
            });
        });


        return true;
    }
}
