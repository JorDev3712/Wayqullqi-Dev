import { User } from "@prisma/client";
import { db } from "../infrastructure/database/db";

export class UserCardService {
    public async getById(id: string) {
        return await db.user_Card.findUnique({
            where: {
                id: id
            }
        });
    }

    public async getByUserWithId(userId: string, id: string) {
        return await db.user_Card.findUnique({
            where: {
                user_id: userId,
                id: id
            }
        });
    }

    public async getAll(userId: string){
        return await db.user_Card.findMany({
            where: {
                user_id: userId
            }
        })
    }

    public async create(userId: string, id: string, description: string, balance: number, max_amount: number, notice_day: number, notice_hour: number, enable_notice: boolean){
        return await db.user_Card.create({
            data: {
                id,
                user_id: userId,
                description,
                balance,
                max_amount,
                notice_day,
                notice_hour,
                enable_notice,
                deleted: false
            }
        });
    }
}