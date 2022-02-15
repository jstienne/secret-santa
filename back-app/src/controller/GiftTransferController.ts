import { Request, Response } from "express";
import { GiftTransferService } from "../service/GiftTransferService";

export class GiftTransferController {

    private giftTransferService: GiftTransferService;

    constructor() {
        this.giftTransferService = new GiftTransferService();
    }

    async getGiftTransfers(request: Request, response: Response) {
        return this.giftTransferService.getGiftTransfers()
            .then(result => response.send(result))
            .catch(error => response.status(400).send(error.stack))
    }
}