import { User, User_Card } from "@prisma/client";

export type UserWithCards = User & {
    cards: (User_Card)[];
};