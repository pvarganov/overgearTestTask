import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Bills } from '../bills/bills.entity'

export enum transType {
    transfer,
    refill,

}

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountFrom: number;

    @Column()
    accountTo: number;

    @Column('int')
    type: transType;

    @Column()
    amount: number;

    @Column({ unique: true, nullable: true, default: null })
    paymentId: string;

    // @ManyToOne(() => Bills, bill => bill.refills)
    // recipient: Bills;

    // @ManyToOne(() => Bills, bill => bill.writeoffs)
    // payer: Bills;
}
