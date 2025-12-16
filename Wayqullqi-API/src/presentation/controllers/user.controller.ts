import { Request, Response } from "express";
import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from "uuid";
import { UserService } from "../../application/user.service";

import { checkNumber } from "../../utils/util";

import log from "../../utils/logger";

export class UserController {
    private logger = log.createContext('UserController');

    constructor(private readonly userService: UserService) {}
    public async getUser(req: Request, res: Response) {
        this.logger.information('invoke method getUser()');
        try {
            // Verificar si es un UUID válido y si es de tipo v4
            // const isUuidV4 = uuidValidate(id) && uuidVersion(id) === 4;

            const { id } = req.params;
            if (!uuidValidate(id)){
                return res.status(400).json({ message: "Invalid user ID" });
            }

            const user = await this.userService.getByUId(id);
            if (!user){
                return res.status(404).json({ message: "User not found" });
            }

            this.logger.information('Done');
            return res.status(200).json(user);
        } catch(error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Users"});
        }
    }

    public async getUserByClientId(req: Request, res: Response) {
        this.logger.information('invoke method getUserByClientId()');
        try {
            // Verificar si es un UUID válido y si es de tipo v4
            // const isUuidV4 = uuidValidate(id) && uuidVersion(id) === 4;

            const { id } = req.params;
            if (!/^-?\d+$/.test(id)){
                this.logger.warning('Invalid user ID: ' + id);
                return res.status(400).json({ message: "Invalid user ID" });
            }

            const user = await this.userService.getClientId(BigInt(id));
            if (!user){
                this.logger.warning('User not found.');
                return res.status(404).json({ message: "User not found" });
            }

            this.logger.information('Done');
            return res.status(200).json(user);
        } catch(error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Users->ClientId"});
        }
    }

    public async create(req: Request, res: Response) {
        this.logger.information('invoke method create()');
        try {
            const { discordNick, discordUser, discordId } = req.body;

            const user = await this.userService.create(uuidv4(), discordNick, discordUser, BigInt(discordId));
            if (!user){
                this.logger.warning('Registration was not possible.');
                return res.status(404).json({ message: "Registration was not possible" });
            }

            this.logger.information('Done');
            return res.status(200).json(user);
        } catch (error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Users->creation"});
        }
    }

    public async putDeleteAccount(req: Request, res: Response) {
        this.logger.information('invoke method putDeleteAccount()');
        try {
            const { discordId } = req.body;

            if (!checkNumber(discordId, 40)){
                return res.status(400).json({ message: "Invalid discord ID" });
            }

            let entity = await this.userService.getClientId(discordId);
            if (!entity){
                return res.status(404).json({ message: "User not found" });
            }

            if (entity.deleted == true){
                this.logger.warning('User deletion in progress.');
                return res.status(200).json({active: true});
            }

            entity = await this.userService.updateDelete(entity.id, true);
            if (!entity){
                this.logger.warning('[UserController] User deletion was not possible.');
                return res.status(200).json({result: false});
            }

            this.logger.information('[UserController] Done');
            return res.status(200).json({result: true});
        } catch (error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Users->putDeleteAccount"});
        }
    }

    public async putRemoveDeleteAccount(req: Request, res: Response) {
        this.logger.information('invoke method putRemoveDeleteAccount()');
        try {
            const { discordId } = req.body;

            if (!checkNumber(discordId, 40)){
                return res.status(400).json({ message: "Invalid discord ID" });
            }

            let entity = await this.userService.getClientId(discordId);
            if (!entity){
                return res.status(404).json({ message: "User not found" });
            }

            if (entity.deleted == false){
                this.logger.warning('User is not deleted.');
                return res.status(200).json({progress: false});
            }

            entity = await this.userService.updateDelete(entity.id, false);
            if (!entity){
                this.logger.warning('Remove deletion was not possible.');
                return res.status(200).json({result: false});
            }

            this.logger.information('[UserController] Done');
            return res.status(200).json({result: true});
        } catch (error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Users->putRemoveDeleteAccount"});
        }
    }
}
