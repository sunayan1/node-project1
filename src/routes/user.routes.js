import { Router } from "express";
import { allUsersContrller, deleteController, loginController, writeUser } from "../controllers/user.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

const userRouter = Router();

// api/users/
userRouter.post('/login', loginController )

userRouter.get('/allUsers', allUsersContrller)

userRouter.post("/new",writeUser)

userRouter.post('/delete', deleteController)

userRouter.get('/:userId', authMiddleWare)



export default userRouter ;
