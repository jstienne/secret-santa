import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class GiftTransfer {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    supplier: User;

    @ManyToOne(type => User)
    receiver: User;
}
