import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = getConnection().getCustomRepository(UserRepository);
    }

    async saveUsers(names: string[]): Promise<User[]> {
        const result: Promise<User>[] = names.map(async name => {
            const user = await this.userRepository.findByName(name)
            if (user === undefined) {
                return this.userRepository.save({ name, selected: true } as User);
            } else {
                user.selected = true;
                return this.userRepository.save(user);
            }
        });

        return Promise.all(result);
    }

    async saveBlacklist(userId: number, blacklist: string[]): Promise<User[]> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new Error("User does not exist");
        }

        user.blacklist = await this.userRepository.findByNames(blacklist);
        if (user.blacklist.length !== blacklist.length) {
            throw new Error("At least one blacklisted user do not exist");
        }

        await this.userRepository.save(user);
        return user.blacklist;
    }
}