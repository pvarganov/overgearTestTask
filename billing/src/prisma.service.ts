import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: [
        {
            emit: 'stdout',
            level: 'query',
        },
    ]
});
@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: [
                {
                    emit: 'stdout',
                    level: 'query',
                },
            ]
        });
    }
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
