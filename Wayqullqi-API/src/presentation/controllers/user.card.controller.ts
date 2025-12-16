import { Request, Response } from "express";
import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from "uuid";
import { UserCardService } from "../../application/user.card.service";

import { checkDescriptionLetters, checkOnlyNumber, checkOnlyLetters } from "../../utils/util";

import log from "../../utils/logger";

export class UserCardController {
    private logger = log.createContext('UserCardController');
    
    constructor(private readonly userCardService: UserCardService) { }

    public async getAll(req: Request, res: Response) {
        this.logger.information('getAll() method invoked');
        try{
            const { userId } = req.params;
            if (!uuidValidate(userId)){
                this.logger.warning('Invalid user ID');
                return res.status(400).json({ message: "Invalid user ID" });
            }

            const cards = await this.userCardService.getAll(userId);
            if (cards.length < 1){
                this.logger.warning(`User and Cards not found by ${userId}`);
                return res.status(404).json({ message: "User and Cards not found" });
            }

            this.logger.information('Done!');
            return res.status(200).json(cards);
        } catch(error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Cards"});
        }
    }

    public async getById(req: Request, res: Response) {
        this.logger.information('getById() method invoked');
        try{
            const { id } = req.params;
            if (!uuidValidate(id)){
                this.logger.warning('Invalid ID');
                return res.status(400).json({ message: "Invalid ID" });
            }

            const card = await this.userCardService.getById(id);
            if (!card){
                this.logger.warning(`Cards not found by ${id}`);
                return res.status(404).json({ message: "Card not found" });
            }

            this.logger.information('Done!');
            return res.status(200).json(card);
        } catch(error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Card->id"});
        }
    }

    public async getByUserWithId(req: Request, res: Response) {
        this.logger.information('getByUserWithId() method invoked');
        try{
            const { userId, id } = req.params;
            if (!uuidValidate(id) || !uuidValidate(userId)){
                this.logger.warning('Invalid IDs');
                return res.status(400).json({ message: "Invalid IDs" });
            }

            const card = await this.userCardService.getByUserWithId(userId, id);
            if (!card){
                this.logger.warning(`User ${userId} and Card ${id} not found`);
                return res.status(404).json({ message: "User and Card not found" });
            }

            this.logger.information('Done!');
            return res.status(200).json(card);
        } catch(error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Card->user-id"});
        }
    }

    public async create(req: Request, res: Response) {
        this.logger.information('create() method invoked');
        try {
            const { userId } = req.params;
            if (!uuidValidate(userId)){
                this.logger.warning('Invalid User Id');
                return res.status(400).json({ message: "Invalid User Id" });
            }

            const { description, balance, maxAmount, noticeDay, noticeHour, enable } = req.body;

            if (!checkDescriptionLetters(description, 20)) {
                this.logger.warning('Invalid Description.');
                return res.status(400).json({ message: "Invalid Description" });
            }

            if (!checkOnlyNumber(balance, 3)) {
                this.logger.warning('Invalid Balance.');
                return res.status(400).json({ message: "Invalid Balance" });
            }

            if (!checkOnlyNumber(maxAmount, 3)) {
                this.logger.warning('Invalid Amount.');
                return res.status(400).json({ message: "Invalid Amount" });
            }

            if (!checkOnlyNumber(noticeDay, 2)) {
                this.logger.warning('Invalid Notice by Day.');
                return res.status(400).json({ message: "Notice by Day" });
            }

            if (!checkOnlyNumber(noticeHour, 2)) {
                this.logger.warning('Invalid Notice by Hour.');
                return res.status(400).json({ message: "Notice by Hour" });
            }

            if (!checkOnlyLetters(enable.toString(), 5)) {
                this.logger.warning('Invalid enable notice.');
                return res.status(400).json({ message: "Notice enable notice" });
            }

            const card = await this.userCardService.create(userId, uuidv4(), description, balance, maxAmount, noticeDay, noticeHour, enable);
            if (!card){
                this.logger.warning('The creation of the card was not possible.');
                return res.status(404).json({ message: "The creation of the card was not possible." });
            }

            this.logger.information('Done');
            return res.status(200).json(card);
        } catch (error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Card->creation"});
        }
    }

    public async update(req: Request, res: Response) {
        this.logger.information('update() method invoked');
        try {
            const { userId } = req.params;
            if (!uuidValidate(userId)){
                this.logger.information('Invalid User Id');
                return res.status(400).json({ message: "Invalid User Id" });
            }

            const { cardId, description, balance, maxAmount, noticeDay, noticeHour, enable } = req.body;

            if (!uuidValidate(cardId)){
                this.logger.warning('Invalid Card Id');
                return res.status(400).json({ message: "Invalid Card Id" });
            }

            if (!checkDescriptionLetters(description, 20)) {
                this.logger.warning('Invalid Description.');
                return res.status(400).json({ message: "Invalid Description" });
            }

            if (!checkOnlyNumber(balance, 3)) {
                this.logger.warning('Invalid Balance.');
                return res.status(400).json({ message: "Invalid Balance" });
            }

            if (!checkOnlyNumber(maxAmount, 3)) {
                this.logger.warning('Invalid Amount.');
                return res.status(400).json({ message: "Invalid Amount" });
            }

            if (!checkOnlyNumber(noticeDay, 2)) {
                this.logger.warning('Invalid Notice by Day.');
                return res.status(400).json({ message: "Notice by Day" });
            }

            if (!checkOnlyNumber(noticeHour, 2)) {
                this.logger.warning('Invalid Notice by Hour.');
                return res.status(400).json({ message: "Notice by Hour" });
            }

            if (!checkOnlyLetters(enable.toString(), 5)) {
                this.logger.warning('Invalid enable notice.');
                return res.status(400).json({ message: "Notice enable notice" });
            }

            const card = await this.userCardService.update(userId, cardId, description, balance, maxAmount, noticeDay, noticeHour, enable);
            if (!card){
                this.logger.warning('The updating of the card was not possible.');
                return res.status(404).json({ message: "The updating of the card was not possible." });
            }

            this.logger.information('Done');
            return res.status(200).json(card);
        } catch (error){
            this.logger.error("Error: {0}", error);
            return res.status(500).json({message: "Server error @Card->update"});
        }
    }

    public async updateDeleteCard(req: Request, res: Response) {
            this.logger.information('invoke method updateDeleteCard()');
            try {
                const { cardId, discordId } = req.body;
    
                if (!uuidValidate(cardId)){
                    this.logger.warning('Invalid Card Id: ' + cardId);
                    return res.status(400).json({ message: "Invalid Card Id" });
                }
    
                // let entity = await this.userService.getClientId(discordId);
                // if (!entity){
                //     return res.status(404).json({ message: "User not found" });
                // }
    
                // if (entity.deleted == true){
                //     console.log('[UserController] User deletion in progress.');
                //     return res.status(200).json({active: true});
                // }

                let entity = await this.userCardService.getById(cardId);
                if (!entity){
                    this.logger.warning('Card not found.');
                    return res.status(404).json({ message: "Card not found" });
                }

                if (entity.deleted == true){
                    this.logger.warning('Card deletion in progress.');
                    return res.status(200).json({active: true});
                }

                entity = await this.userCardService.updateDelete(cardId, true);
                if (!entity){
                    this.logger.warning('Card deletion was not possible.');
                    return res.status(200).json({result: false});
                }
    
                this.logger.information('Done');
                return res.status(200).json({result: true});
            } catch (error){
                this.logger.error("Error: {0}", error);
                return res.status(500).json({message: "Server error @Cards->updateDeleteCard"});
            }
        }
}