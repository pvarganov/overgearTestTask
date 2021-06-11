import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Transactions } from '../transactions/transactions.entity'
import { Users } from '../users/users.entity'

@Entity()
export class Bills {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    balance: number;

    @OneToOne(() => Users, user => user.bill)
    @JoinColumn()
    user: Users;

    // @OneToMany(() => Transactions, transaction => transaction.recipient)
    // refills: Transactions[];

    // @OneToMany(() => Transactions, transaction => transaction.payer)
    // writeoffs: Transactions[];
}
