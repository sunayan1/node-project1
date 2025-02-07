import { Router } from "express";
import { allUsersContrller, deleteController, getUserProfileController, loginController, writeUser } from "../controllers/user.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { createPostsController, deletePostController, getAllPostsController, getPostByIdController, getPostByUserIdController, updatePostController } from "../controllers/post.controller.js";

const postRouter = Router();

// api/posts/
postRouter.route("/")
.get(authMiddleWare,getAllPostsController)
.post(authMiddleWare,createPostsController)

postRouter
.route("/:postId")
.get(authMiddleWare, getPostByIdController)
.delete(authMiddleWare, deletePostController)
.patch(authMiddleWare, updatePostController)


postRouter.get("/user/:userId",authMiddleWare, getPostByUserIdController)

export default postRouter ;
