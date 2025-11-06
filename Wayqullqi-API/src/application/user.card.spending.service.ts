import { User } from "@prisma/client";
import { db } from "../infrastructure/database/db";

export class UserCardSpendingService {
    public async getAll(userId: string, cardId: string){
        return await db.user_Spending.findMany({
            where: {
                user_id: userId,
                card_id: cardId
            }
        })
    }

    public async create(id: string, userId: string, cardId: string, name: string, amount: number){
        return await db.user_Spending.create({
            data: {
                id,
                user_id: userId,
                card_id: cardId,
                name,
                amount
            }
        });
    }
}