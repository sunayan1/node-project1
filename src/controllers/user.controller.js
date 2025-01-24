import { StatusCodes } from "http-status-codes";
import {loginService} from "../services/user.service.js";



export const loginController= async(req,res)=>{
    console.log(req);
    const data= await loginService(req.body);
    res.status(StatusCodes.ACCEPTED).json(data);
}