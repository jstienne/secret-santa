import * as express from "express";
import * as cors from "cors";
import { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { GiftTransferController } from "./controller/GiftTransferController";
import { UserController } from "./controller/UserController";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({
      extended: true
    }));
    app.use(cors())
    app.options('*', cors())
    
    app.post("/users", (req: Request, res: Response) => {
        return new UserController().saveUsers(req, res)
    });

    app.post("/users/:id/blacklist", (req: Request, res: Response) => {
        return new UserController().saveBlacklist(req, res)
    });

    app.get("/gift-transfers", (req: Request, res: Response) => {
        return new GiftTransferController().getGiftTransfers(req, res)
    });

    app.get("/users", (req: Request, res: Response) => {
        return new UserController().getUsers(req, res)
    });

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000.");

}).catch(error => console.log(error));
