import { Router } from "express";
import { loginControllr, registerController } from "../Controllers/authController.js";

const authRouter = Router()
authRouter.post("/register", registerController)
authRouter.post("/login", loginControllr)
export default authRouter