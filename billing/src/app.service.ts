import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
	users,
	bills,
	transactions,
	Prisma
} from '@prisma/client';

@Injectable()
export class AppService {
	constructor(private prisma: PrismaService) { }
	getHello(): string {
		return 'Hello World!';
	}

	async payment(data: { paymentId: string; email: any; amount: number }): Promise<String> {
		console.log(data);
		await this.prisma.users.update({
			where: {
				email: data.email
			},
			data: {
				bill: {
					update: {
						balance: data.amount,
						refills: {
							create: {
								type: "refill",
								paymentid: data.paymentId,
								amount: data.amount
							}
						}
					}
				},
			}
		})
		return 'ok'
	}

	async transfer(data: { userFrom: number; userTo: number; amount: number }): Promise<String> {
		console.log(data);
		await this.prisma.$transaction([
			this.prisma.bills.update({
				where: {
					id: data.userFrom
				},
				data: {
					balance: {
						decrement: data.amount
					}
				}
			}),
			this.prisma.bills.update({
				where: {
					id: data.userTo
				},
				data: {
					balance: {
						increment: data.amount
					},
					refills: {
						create: {
							type: "transfer",
							accountfrom: data.userFrom,
							amount: data.amount
						}
					}
				}
			}),
		]);
		return 'ok'
	}
}
