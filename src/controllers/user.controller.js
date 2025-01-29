import { StatusCodes } from "http-status-codes";
import {allUsersService, loginService,WriteuserService} from "../services/user.service.js";



export const loginController= async(req,res,next)=>{
    console.log(req);

    try{
        const data= await loginService(req.body);
        res.status(StatusCodes.ACCEPTED).json(data);
    }catch(error){
        console.error(error)
        next(error)
    }
}

export const allUsersContrller= async (req,res)=>{
    try{
    const data= await allUsersService();
    res.status(200).json(data);
    }catch(error){
        console.log(error);
        next(error)
    }
}

export const writeUser=async(req,res,next)=>{
    try{
        const data=await WriteuserService(req.body);
        res.status(200).json({data})
    }catch(error){
        console.error(error)
        next(error)
    }
}
