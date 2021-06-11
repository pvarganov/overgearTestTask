import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Bills } from '../bills/bills.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true })
    email: string;

    @OneToOne(() => Bills, bill => bill.user) // specify inverse side as a second parameter
    bill: Bills;
}
