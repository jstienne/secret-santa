import * as _ from "lodash";
import { getConnection } from "typeorm";
import { GiftTransfer } from "../entity/GiftTransfer";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

export class GiftTransferService {

    private userRepository: UserRepository;
    // private giftTransferRepository: GiftTransferRepository;

    constructor() {
        this.userRepository = getConnection().getCustomRepository(UserRepository);
        // this.giftTransferRepository = getConnection().getCustomRepository(GiftTransferRepository);
    }

    async getGiftTransfers(): Promise<GiftTransfer[]> {
        // Get selected users with possible receivers
        const users = await this.userRepository.findBySelectedUsers();
        const usersWithPossibleReceivers = new Map<number, User[]>();
        users.forEach(currentUser => {
            const possibleUsers = users.reduce((possibleReceivers, user) => {
                if (currentUser.id !== user.id
                    && (!currentUser.blacklist.length || !currentUser.blacklist.map(userInBlackList => userInBlackList.id).includes(user.id))) {
                    possibleReceivers.push(user)
                }
                return possibleReceivers;
            }, []);

            usersWithPossibleReceivers.set(currentUser.id, possibleUsers);
        })

        // Get random
        let found = false;
        let maxTry = 0;
        let giftTransfers = [];

        while (!found && maxTry < 1000) {
            const clonedUsersWithPossibleReceivers = new Map(usersWithPossibleReceivers)

            for (let user of users) {
                console.log("user " + JSON.stringify(user))

                const giftTransfer = new GiftTransfer();
                giftTransfer.supplier = user;

                const possibleReceivers = clonedUsersWithPossibleReceivers.get(user.id);
                giftTransfer.receiver = possibleReceivers[_.random(possibleReceivers.length - 1)];
                if (giftTransfer.receiver) {
                    giftTransfers.push(giftTransfer);

                    // Update possible receivers by removing the found receiver
                    users.forEach(userToUpdate => clonedUsersWithPossibleReceivers.set(userToUpdate.id,
                        clonedUsersWithPossibleReceivers.get(userToUpdate.id)
                            .filter(possibleReceiver => possibleReceiver.id !== giftTransfer.receiver.id)));
                } else {
                    break;
                }
            }

            if (giftTransfers.length === users.length) {
                found = true
            } else {
                giftTransfers = [];
                maxTry++;
            }
        }

        if (!found) {
            throw new Error("No possibility found");
        }


        // Save transfer
        // const giftTransferPromise: Promise<GiftTransfer[]> = this.giftTransferRepository.save(giftTransfers);

        // Save history
        // const historyPromise: Promise<History[]> = this.historyRepository.save(giftTransfers);

        // Save user with false
        const userPromises: Promise<User>[] = users.map(user => {
            user.selected = false;
            return this.userRepository.save(user);
        });

        return Promise.all(userPromises).then(() => {
            return giftTransfers;
        });
    }

}