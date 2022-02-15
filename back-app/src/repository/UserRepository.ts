import { EntityRepository, getRepository, In, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    private userRepository = getRepository(User);

    async findByName(name: string): Promise<User> {
        return this.userRepository.findOne({ where: { name } })
    }
    
    async findByNames(names: string[]): Promise<User[]> {
        return this.userRepository.find({ where: { name: In(names) } })
    }
    
    async findBySelectedUsers(): Promise<User[]> {
        return this.userRepository.find({ where: { selected: true }, relations: ['blacklist'] })
    }
}