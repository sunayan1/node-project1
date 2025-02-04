import { Router } from "express";
import { allUsersContrller, deleteController, getUserProfileController, loginController, writeUser } from "../controllers/user.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

const postRouter = Router();

// api/users/
postRouter.route("/").get(getAllPostsController).post(createPostController)

postRouter.route("/:postId").get(getPostByIdController).patch(updatePostController).delete(deletePostController)


export default postRouter ;
