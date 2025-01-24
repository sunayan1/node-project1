import { Router } from "express";
import { loginController } from "../controllers/user.controller.js";

const userRouter = Router();

// api/users/
userRouter.post('/login', loginController )



export default userRouter ;
