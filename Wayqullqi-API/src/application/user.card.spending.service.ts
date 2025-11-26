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

    public async getAllByDate(userId: string, cardId: string, startOfDay: string, endOfDay: string){
        console.log(startOfDay);
        console.log(endOfDay);
        return await db.$queryRawUnsafe(
            `SELECT * FROM User_Spending
             WHERE card_id = ?
             AND user_id = ?
             AND createdAt BETWEEN ? AND ?
             ORDER BY createdAt DESC;`,
             cardId,
             userId,
             startOfDay,
             endOfDay
        );
        // return await db.user_Spending.findMany({
        //     where: {
        //         user_id: userId,
        //         card_id: cardId,
        //         createdAt: {
        //             gte: startOfDay,
        //             lte: endOfDay
        //         },
        //     },
        //     orderBy: {
        //         createdAt: 'asc'
        //     },
        // });
    }

    public async addFast(id: string, userId: string, cardId: string, name: string, amount: number){
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

    public async create(id: string, userId: string, cardId: string, name: string, amount: number, date: Date){
        return await db.user_Spending.create({
            data: {
                id,
                user_id: userId,
                card_id: cardId,
                name,
                amount,
                createdAt : date
            }
        });
    }
}