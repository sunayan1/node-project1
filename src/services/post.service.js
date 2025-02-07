
import { prisma } from "../db/index.js"
import { generateJwtToken } from "../libs/jwt-utils.js";

export const getPostService= async ()=>{
    const posts= await prisma.post.findMany()
    return posts;
};

export const createPostService= async(contentData, userId)=>{
    const posts= await prisma.post.create({
        data:{
            contents: contentData.content,
            authorId: userId
        }
    })
    // const token= await generateJwtToken(user.id)
    return posts
}

export const updatePostService= async( postId, updateData, loggedInUserId)=>{
    const post= await prisma.post.findUnique({where:{id:postId}})
    if(!post){
        throw new Error("Not found", {cause: "NotFoundCustomError"})
    }

    if(updateData.likeCase=="like"){
        post.likesCount= post.likesCount+1
    }else if(updateData.likeCase=='unlike'){
        if(post.likesCount>0){
            post.likesCount= post.likesCount-1
        }
        
    }

    if(updateData.content){
        post.contents= updateData.content; 
    }


    if(post.userId != loggedInUserId){
        throw new Error("Unauthorized error", {cause: "UnauthorizedError"})
       
   }
   else{
    const data= await prisma.post.update({
        where:{id:postId},
        data: post
    })
   }
   return post
   
}

export const getPostByIdService= async (postId)=>{
    const post= await prisma.post.findUnique({where:{id:postId}})
    if(!post){
        throw new Error("Not found", {cause:"NotFoundCustomError"});
    }
    return post
}

export const getPostByUserIdService= async (userId)=>{
    const posts= await prisma.post.findMany({where: {authorId:userId}})
    if(!posts){
        throw new Error("Not found", {cause: "NotFoundCustomError"});
    }
    return posts
}

export const deletePostByIdService= async(postId, loggedInUserId)=>{
    const post = await prisma.post.findUnique({where: {id:postId}})

    if(!post){
        throw new Error("Not found", {cause: "NotFoundCustomError"})
    }

    if(post.userId= loggedInUserId){
         await prisma.post.delete({where: {id:postId}})
        
    }
    else{
        throw new Error("Unauthorized error", {cause: "UnauthorizedError"})
    }
   
    return {message: "Post delted successfully"}
}