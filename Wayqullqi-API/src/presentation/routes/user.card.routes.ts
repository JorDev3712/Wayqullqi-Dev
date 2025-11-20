import { Router } from "express";
import { UserCardController } from "../controllers/user.card.controller";
import { UserCardService } from "../../application/user.card.service";

const router = Router();

const service = new UserCardService();
const controller = new UserCardController(service);

router.get("/:id", controller.getById.bind(controller));
router.get("/all/:userId", controller.getAll.bind(controller));
router.get("/user/:userId/:id", controller.getByUserWithId.bind(controller));
router.post("/create/:userId", controller.create.bind(controller));
router.put("/update/:userId", controller.update.bind(controller));

export default router;