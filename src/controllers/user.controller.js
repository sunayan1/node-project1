import { StatusCodes } from "http-status-codes";
import {allUsersService, loginService} from "../services/user.service.js";



export const loginController= async(req,res)=>{
    console.log(req);
    const data= await loginService(req.body);
    res.status(StatusCodes.ACCEPTED).json(data);
}

export const allUsersContrller= async (req,res)=>{
    const data= await allUsersService();
    res.status(200).json(data);
}