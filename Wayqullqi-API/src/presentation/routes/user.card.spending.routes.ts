import { Router } from "express";
import { UserCardSpendingController } from "../controllers/user.card.spending.controller";
import { UserCardSpendingService } from "../../application/user.card.spending.service";

const router = Router();

const service = new UserCardSpendingService();
const controller = new UserCardSpendingController(service);

router.get("/all/:userId/:cardId", controller.getAll.bind(controller));
router.post("/create/:userId", controller.create.bind(controller));

export default router;