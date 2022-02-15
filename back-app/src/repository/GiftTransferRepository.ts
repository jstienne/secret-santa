import { EntityRepository, getRepository, In, Repository } from "typeorm";
import { GiftTransfer } from "../entity/GiftTransfer";

@EntityRepository(GiftTransfer)
export class GiftTransferRepository extends Repository<GiftTransfer> {
}