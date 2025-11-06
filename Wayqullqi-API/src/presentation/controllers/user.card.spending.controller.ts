import { Request, Response } from "express";
import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from "uuid";
import { UserCardSpendingService } from "../../application/user.card.spending.service";

import { checkOnlyLetters, checkOnlyNumber } from "../../utils/util";

export class UserCardSpendingController {
    constructor(private readonly userCardSpendingService: UserCardSpendingService) { }

    public async getAll(req: Request, res: Response) {
        console.log('[UserCardSpendingController] getAll() method invoked');
        try{
            const { userId, cardId } = req.params;
            if (!uuidValidate(userId) || !uuidValidate(cardId)){
                console.log('[UserCardSpendingController] Invalid user ID and card ID');
                return res.status(400).json({ message: "Invalid user ID and card ID" });
            }

            const spendings = await this.userCardSpendingService.getAll(userId, cardId);

            console.log('[UserCardSpendingController] Done!');
            return res.status(200).json(spendings);
        } catch(error){
            console.error(error);
            return res.status(500).json({message: "Server error @Spending"});
        }
    }

    public async create(req: Request, res: Response) {
        console.log('[UserCardSpendingController] create() method invoked');
        try {
            const { userId } = req.params;
            if (!uuidValidate(userId)){
                console.log('[UserCardSpendingController] Invalid User Id');
                return res.status(400).json({ message: "Invalid User Id" });
            }

            const { cardId, name, amount } = req.body;

            if (!uuidValidate(cardId)){
                console.log('[UserCardSpendingController] Invalid Card Id');
                return res.status(400).json({ message: "Invalid Card Id" });
            }

            if (!checkOnlyLetters(name, 21)){
                console.log('[UserCardSpendingController] Invalid name');
                return res.status(400).json({ message: "Invalid name: only letters allowed and less than 21 characters." });
            }

            if (!checkOnlyNumber(amount, 4)){
                console.log('[UserCardSpendingController] Invalid amount');
                return res.status(400).json({ message: "Invalid amount: only numbers allowed and less than 4 characters." });
            }

            const spending = await this.userCardSpendingService.create(uuidv4(),userId, cardId, name, amount);
            if (!spending){
                console.log('[UserCardSpendingController] The creation of the spending was not possible.');
                return res.status(404).json({ message: "The creation of the spending was not possible." });
            }

            console.log('[UserCardSpendingController] Done');
            return res.status(200).json(spending);
        } catch (error){
            console.error(error);
            return res.status(500).json({message: "Server error @Spending->creation"});
        }
    }
}