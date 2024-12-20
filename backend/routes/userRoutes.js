import { Router } from "express";
const router = Router();
import {
  forgotUserPassword,
  login,
  resetPassword,
  signUp,
} from "../controllers/userController.js";

router.post("/signup", signUp);
router.post("/signin", login);
router.post("/forgot-password", forgotUserPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
