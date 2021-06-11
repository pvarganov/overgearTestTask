import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { Bills } from './bills/bills.entity';
import { Transactions } from './transactions/transactions.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresql',
      port: 5432,
      username: 'overgear',
      password: 'overgear',
      database: 'overgear',
      entities: [Users, Bills, Transactions],
      logging: ["query"]
    }), UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
