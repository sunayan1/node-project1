import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"
import { prisma } from "../db/index.js";


export const authMiddleWare=(req, res, next)=>{
    const authHeader= req.headers.authorization
    const authToken=  authHeader.split(" ")[1];

    if(!authToken){
        res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid Token"});
    }

    console.log(authToken);
    try{
        // console.log(process.env.JWT_SECRET)
        const saman= jwt.verify(authToken, process.env.JWT_SECRET);
        console.log(saman);

        const user= prisma.user.findUnique({where: {id:saman.sub}});

    }catch(error){
        console.log(error)
    }
}