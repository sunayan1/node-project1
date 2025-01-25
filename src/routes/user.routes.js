import { Router } from "express";
import { allUsersContrller, loginController } from "../controllers/user.controller.js";

const userRouter = Router();

// api/users/
userRouter.post('/login', loginController )

userRouter.get('/allUsers', allUsersContrller)



export default userRouter ;
