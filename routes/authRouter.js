import { Router } from "express";
import { userLogin, userSignup } from "../controllers/auth.js";

const authRouter = Router()

authRouter.post("/add-user", userSignup)
authRouter.post("/login-user", userLogin)

export default authRouter
