import { Router } from "express";
const router = Router();
import { login, signUp } from "../controllers/userController.js";

router.post("/signup", signUp);
router.post("/signin", login);

export default router;
