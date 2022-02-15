import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { GiftTransfer } from "./GiftTransfer";

@Entity()
export class History {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: string;

    @ManyToMany(type => GiftTransfer)
    @JoinTable()
    giftTransfers: GiftTransfer[];
}
