import { Request, Response } from "express";
import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from "uuid";
import { UserCardService } from "../../application/user.card.service";

export class UserCardController {
    constructor(private readonly userCardService: UserCardService) { }

    public async getAll(req: Request, res: Response) {
        console.log('[UserCardController] getAll() method invoked');
        try{
            const { userId } = req.params;
            if (!uuidValidate(userId)){
                console.log('[UserCardController] Invalid user ID');
                return res.status(400).json({ message: "Invalid user ID" });
            }

            const cards = await this.userCardService.getAll(userId);
            if (cards.length < 1){
                console.log(`[UserCardController] User and Cards not found by ${userId}`);
                return res.status(404).json({ message: "User and Cards not found" });
            }

            console.log('[UserCardController] Done!');
            return res.status(200).json(cards);
        } catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error @Cards"});
        }
    }

    public async getById(req: Request, res: Response) {
        console.log('[UserCardController] getById() method invoked');
        try{
            const { id } = req.params;
            if (!uuidValidate(id)){
                console.log('[UserCardController] Invalid ID');
                return res.status(400).json({ message: "Invalid ID" });
            }

            const card = await this.userCardService.getById(id);
            if (!card){
                console.log(`[UserCardController] Cards not found by ${id}`);
                return res.status(404).json({ message: "Card not found" });
            }

            console.log('[UserCardController] Done!');
            return res.status(200).json(card);
        } catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error @Card->id"});
        }
    }

    public async getByUserWithId(req: Request, res: Response) {
        console.log('[UserCardController] getByUserWithId() method invoked');
        try{
            const { userId, id } = req.params;
            if (!uuidValidate(id) || !uuidValidate(userId)){
                console.log('[UserCardController] Invalid IDs');
                return res.status(400).json({ message: "Invalid IDs" });
            }

            const card = await this.userCardService.getByUserWithId(userId, id);
            if (!card){
                console.log(`[UserCardController] User ${userId} and Card ${id} not found`);
                return res.status(404).json({ message: "User and Card not found" });
            }

            console.log('[UserCardController] Done!');
            return res.status(200).json(card);
        } catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error @Card->user-id"});
        }
    }

    public async create(req: Request, res: Response) {
        console.log('[UserCardController] create() method invoked');
        try {
            const { userId } = req.params;
            if (!uuidValidate(userId)){
                console.log('[UserCardController] Invalid User Id');
                return res.status(400).json({ message: "Invalid User Id" });
            }

            const { description, balance, maxAmount, noticeDay, noticeHour, enable } = req.body;

            const card = await this.userCardService.create(userId, uuidv4(), description, balance, maxAmount, noticeDay, noticeHour, enable);
            if (!card){
                console.log('[UserCardController] The creation of the card was not possible.');
                return res.status(404).json({ message: "The creation of the card was not possible." });
            }

            console.log('[UserCardController] Done');
            return res.status(200).json(card);
        } catch (error){
            console.error(error);
            return res.status(500).json({message: "Server error @Card->creation"});
        }
    }
}