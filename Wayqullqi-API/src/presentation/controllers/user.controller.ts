import { Request, Response } from "express";
import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from "uuid";
import { UserService } from "../../application/user.service";

export class UserController {
    constructor(private readonly userService: UserService) {}
    public async getUser(req: Request, res: Response) {
        console.log('[UserController] invoke method getUser()');
        try {
            console.log('[UserController:getUser()] checking token');
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                console.log('[UserController:getUser()] Not header Authorization.');
                return res.status(401).json({ message: 'Not header Authorization' });
            }

            const [type, apiToken] = authHeader.split(' ');
            if (type !== 'Basic' || !apiToken) {
                console.log('[UserController:getUser()] invalid token fortmat: ' + authHeader);
                return res.status(400).json({ message: 'Invalid token format' });
            }

            if (apiToken !== process.env.API_TOKEN) {
                console.log('[UserController:getUser()] invalid token api : ' + apiToken + " | " + process.env.API_TOKEN);
                return res.status(403).json({ message: "Invalid Token" });
            }

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

            return res.status(200).json(user);
        } catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error @Users"});
        }
    }

    public async getUserByClientId(req: Request, res: Response) {
        console.log('[UserController] invoke method getUserByClientId()');
        try {
            console.log('[UserController:getUserByClientId()] checking token');
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                console.log('[UserController:getUserByClientId()] Not header Authorization.');
                return res.status(401).json({ message: 'Not header Authorization' });
            }

            const [type, apiToken] = authHeader.split(' ');
            if (type !== 'Basic' || !apiToken) {
                console.log('[UserController:getUserByClientId()] invalid token fortmat: ' + authHeader);
                return res.status(400).json({ message: 'Invalid token format' });
            }

            if (apiToken !== process.env.API_TOKEN) {
                console.log('[UserController:getUserByClientId()] invalid token api : ' + apiToken + " | " + process.env.API_TOKEN);
                return res.status(403).json({ message: "Invalid Token" });
            }

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
        // const nuevo = await service.crearGasto(req.body);
        // res.status(201).json(nuevo);
        try {
            console.log('[UserController:create()] checking token');
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                console.log('[UserController:create()] Not header Authorization.');
                return res.status(401).json({ message: 'Not header Authorization' });
            }

            const [type, apiToken] = authHeader.split(' ');
            if (type !== 'Basic' || !apiToken) {
                console.log('[UserController:create()] invalid token fortmat: ' + authHeader);
                return res.status(400).json({ message: 'Invalid token format' });
            }

            if (apiToken !== process.env.API_TOKEN) {
                console.log('[UserController:create()] invalid token api : ' + apiToken + " | " + process.env.API_TOKEN);
                return res.status(403).json({ message: "Invalid Token" });
            }

            const { email, discordUser, discordId } = req.body;
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(email)){
                console.log('[UserController:create()] Invalid email.');
                return res.status(400).json({ message: "Invalid email." });
            }

            const user = await this.userService.create(uuidv4(), email, discordUser, BigInt(discordId));
            if (!user){
                console.log('[UserController:create()] Registration was not possible.');
                return res.status(404).json({ message: "Registration was not possible" });
            }

            // const card = await this.userService.createCard(user.uid);
            // if (!card){
            //     return res.status(404).json({ message: "The first card was not created" });
            // }

            console.log('[UserController:create()] Done');
            return res.status(200).json(user);
        } catch (error){
            console.error(error);
            return res.status(500).json({message: "Server error @Users->creation"});
        }
    }
}
