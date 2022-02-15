import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { UserService } from "../service/UserService";

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async saveUsers(request: Request, response: Response) {
        return response.send(await this.userService.saveUsers(request.body));
    }

    async saveBlacklist(request: Request, response: Response) {
        return this.userService.saveBlacklist(request.params.id, request.body)
            .then(result => response.send(result))
            .catch(error => response.status(400).send(error.stack))
    }

    private userRepository = getRepository(User);

    async getUsers(request: Request, response: Response) {
        return response.send(await this.userRepository.find()).json();
    }

}