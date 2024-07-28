import {Router} from "express";
import {getUserByEmail, addUser} from "../controllers/user.controller";
import { createUserValidation } from "../middlewares/user.middleware";
const router = Router();

router.get("/:email", getUserByEmail);
router.post("/",[createUserValidation], addUser);

export default router;
