import { Request, Response } from "express";
import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from "uuid";
import { UserCardSpendingService } from "../../application/user.card.spending.service";

import { checkOnlyLetters, checkOnlyNumber, checkNumber } from "../../utils/util";

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

    public async getDaily(req: Request, res: Response) {
        console.log('[UserCardSpendingController] getDaily() method invoked');
        try {
            const { userId } = req.params;
            if (!uuidValidate(userId)){
                console.log('[UserCardSpendingController] Invalid User Id');
                return res.status(400).json({ message: "Invalid User Id" });
            }

            const { cardId, year, month, day } = req.body;

            if (!uuidValidate(cardId)){
                console.log('[UserCardSpendingController] Invalid Card Id');
                return res.status(400).json({ message: "Invalid Card Id" });
            }

            if (!checkNumber(year, 4)){
                console.log('[UserCardSpendingController] Invalid year');
                return res.status(400).json({ message: "Invalid year: only numbers allowed and less than 4 characters." });
            }

            if (year < 2025){
                console.log('[UserCardSpendingController] Invalid year #2');
                return res.status(400).json({ message: "Invalid year: It is less than 2025." });
            }

            if (!checkNumber(month, 2)){
                console.log('[UserCardSpendingController] Invalid month');
                return res.status(400).json({ message: "Invalid month: only numbers allowed and less than 2 characters." });
            }

            if (month < 1 || month > 12){
                console.log('[UserCardSpendingController] Invalid month #2');
                return res.status(400).json({ message: "Invalid month." });
            }

            if (!checkNumber(day, 2)){
                console.log('[UserCardSpendingController] Invalid day');
                return res.status(400).json({ message: "Invalid day: only numbers allowed and less than 2 characters." });
            }

            if (day < 1 || day > 31){
                console.log('[UserCardSpendingController] Invalid day #2');
                return res.status(400).json({ message: "Invalid day." });
            }

            // 2025-11-07 00:00:00 - 2025-11-07 23:59:59

            const spendings = await this.userCardSpendingService.getAllByDate(userId, cardId, `${year}-${month}-${day} 00:00:00`, `${year}-${month}-${day} 23:59:59`);

            console.log('[UserCardSpendingController] Done!');
            return res.status(200).json(spendings);
        } catch (error){
            console.error(error);
            return res.status(500).json({message: "Server error @Spending->getDaily"});
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