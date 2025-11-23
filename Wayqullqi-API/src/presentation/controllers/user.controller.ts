import { Request, Response } from "express";
import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from "uuid";
import { UserService } from "../../application/user.service";

import { checkNumber } from "../../utils/util";

export class UserController {
    constructor(private readonly userService: UserService) {}
    public async getUser(req: Request, res: Response) {
        console.log('[UserController] invoke method getUser()');
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

            console.log('[UserController:getUser()] Done');
            return res.status(200).json(user);
        } catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error @Users"});
        }
    }

    public async getUserByClientId(req: Request, res: Response) {
        console.log('[UserController] invoke method getUserByClientId()');
        try {
            // Verificar si es un UUID válido y si es de tipo v4
            // const isUuidV4 = uuidValidate(id) && uuidVersion(id) === 4;

            const { id } = req.params;
            if (!/^-?\d+$/.test(id)){
                console.log('[UserController:getUserByClientId()] Invalid user ID: ' + id);
                return res.status(400).json({ message: "Invalid user ID" });
            }

            const user = await this.userService.getClientId(BigInt(id));
            if (!user){
                console.log('[UserController:getUserByClientId()] User not found.');
                return res.status(404).json({ message: "User not found" });
            }

            console.log('[UserController:getUserByClientId()] Done');
            return res.status(200).json(user);
        } catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error @Users->ClientId"});
        }
    }

    public async create(req: Request, res: Response) {
        console.log('[UserController] invoke method create()');
        try {
            const { discordNick, discordUser, discordId } = req.body;

            const user = await this.userService.create(uuidv4(), discordNick, discordUser, BigInt(discordId));
            if (!user){
                console.log('[UserController:create()] Registration was not possible.');
                return res.status(404).json({ message: "Registration was not possible" });
            }

            console.log('[UserController:create()] Done');
            return res.status(200).json(user);
        } catch (error){
            console.error(error);
            return res.status(500).json({message: "Server error @Users->creation"});
        }
    }

    public async putDeleteAccount(req: Request, res: Response) {
        console.log('[UserController] invoke method putDeleteAccount()');
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
                console.log('[UserController] User deletion in progress.');
                return res.status(200).json({active: true});
            }

            entity = await this.userService.updateDelete(entity.id);
            if (!entity){
                console.log('[UserController] User deletion was not possible.');
                return res.status(200).json({result: false});
            }

            console.log('[UserController] Done');
            return res.status(200).json({result: true});
        } catch (error){
            console.error(error);
            return res.status(500).json({message: "Server error @Users->putDeleteAccount"});
        }
    }
}
