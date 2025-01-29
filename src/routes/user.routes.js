import { Router } from "express";
import { allUsersContrller, loginController, writeUser } from "../controllers/user.controller.js";

const userRouter = Router();

// api/users/
userRouter.post('/login', loginController )

userRouter.get('/allUsers', allUsersContrller)

userRouter.post("/new",writeUser)



export default userRouter ;
