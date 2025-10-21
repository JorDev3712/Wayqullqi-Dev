import { User } from "@prisma/client";
import { db } from "../infrastructure/database/db";

export class UserService {
    public async getByUId(id: string) {
        return await db.user.findUnique({
            where: {
                id: id
            }
        });
    }

    public async getClientId(clientId: bigint){
        return await db.user.findFirst({
            where: {
                clientId
            }
        });
    }

    public async create(id: string, email: string, discordUser: string, discordId: bigint){
        return await db.user.create({
            data: {
                id,
                email,
                discordUser,
                clientId: discordId,
                cards: {
                    create: [
                        {
                            description: "default",
                            balance: 200,
                            max_amount: 300,
                            notice_day: 8,
                            notice_hour: 1,
                            enable_notice: true,
                        }
                    ]
                }
            }
        })
    }
}