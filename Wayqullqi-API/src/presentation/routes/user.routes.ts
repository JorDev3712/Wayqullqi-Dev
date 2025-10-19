import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../../application/user.service";

const router = Router();

const service = new UserService();
const controller = new UserController(service);

router.get("/:id", controller.getUser.bind(controller));
router.get("/discord/:id", controller.getUserByClientId.bind(controller));
router.post("/discord/create", controller.create.bind(controller));

export default router;
