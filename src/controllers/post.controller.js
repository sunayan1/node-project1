import { StatusCodes } from "http-status-codes";

import { createUserSchema, loginUserSchema } from "../schemas/user.schema.js";
import { createPostService, deletePostByIdService, getPostByIdService, getPostByUserIdService, getPostService, updatePostService } from "../services/post.service.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";

export const getAllPostsController= async (req, res, next)=>{
    try{
        const posts= await getPostService(); 
        res.status(200).json(posts);
    }catch(error){
        console.log(error);
        next(error)
    }
}


export const createPostsController= async (req, res, next)=>{
    try{
        createPostSchema.parse(req.body)
        const posts= await createPostService(req.body, req.userId); 
        res.status(200).json(posts);
    }catch(error){
        console.log(error);
        next(error)
    }
}

export const getPostByIdController= async (req, res, next)=>{
    try{
       const postId= req.params.postId
       const data= await getPostByIdService(postId)
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        next(error)
    }
}

export const getPostByUserIdController= async (req, res, next)=>{
    try{
       const userId= req.params.userId
       const data= await getPostByUserIdService(userId)
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        next(error)
    }
}

export const deletePostController= async (req, res, next)=>{
    try{
       const postId= req.params.postId
       const loggedInUserId= req.userId
       const data= await deletePostByIdService(postId, loggedInUserId)
        res.status(200).json({message: "Deleted successfully"});
    }catch(error){
        console.log(error);
        next(error)
    }
}

export const updatePostController= async (req, res, next)=>{
    try{
        updatePostSchema.parse(req.body);
       const postId= req.params.postId
       const loggedInUserId= req.userId
       const updatedata= req.body
       const data= await updatePostService(postId, updatedata, loggedInUserId)
        res.status(200).json({message: "updated successfully"});
    }catch(error){
        console.log(error);
        next(error)
    }
}
