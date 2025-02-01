import { StatusCodes } from "http-status-codes";
import pkg from 'jsonwebtoken';

const {JsonWebTokenError}=pkg


export const errorHandler=(error,req,res,next)=>{
    

    console.log(error);
    if(error?.cause=="CustomError"){
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Unauthorized error",
            message: error.message
        });
    }

    if(error instanceof JsonWebTokenError){
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Unauthorized error",
            message: "token invalid"
        })
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error:"Internal Server Error",
        message:"An unexpectd error appeared"
    })
}