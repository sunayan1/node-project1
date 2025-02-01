import { StatusCodes } from "http-status-codes";
import { Prisma, PrismaClient } from "@prisma/client";
import { checkPassword, generateHashForPassword } from "../libs/password-utility.js";
import { generateJwtToken } from "../libs/jwt-utils.js";
const prisma = new PrismaClient();

export const loginService = async (loginData)=>{
    const email= loginData.email
    const password= loginData.password;
    console.log("Checking Database for login");

    const user= await prisma.user.findUnique({
        where: {email:email},
        // omit:{
        //     password: true
        // }
    });
    if(!user){
        throw new Error("Invalid Credentials clsdfk", {cause: "CustomeError"})
    }

   const isPasswordSame= await checkPassword(password, user.password)

   
    if(!isPasswordSame){
        throw new Error("Invalid Credentials aaa", {cause: "CustomeError"})
        
    }

    const token= await generateJwtToken(user.id)

    delete user.password; 
    return {message: "login successfull",user, token };
};


export const allUsersService= async ()=>{
    return await prisma.user.findMany();
}

export const deleteUsersService= async(userData)=>{
    return await prisma.user.deleteMany({where: {fullName: userData.fullName}});
}



export const registerUserService=async(registerData)=>{
    

    const hashedPassword= await generateHashForPassword(registerData.password);
    const res = await prisma.user.create({
        data: {
            id:registerData.id,
            fullName:registerData.fullName,
            email:registerData.email,
            password:hashedPassword,
            gender:registerData.gender,
            },
            omit: {
                password:true,
            }

    })

    const token= await generateJwtToken(res.id)

    return { res, token}

}

export const userProfileService = async (userId)=>{
    const user= await prisma.user.findUnique({
        where:{id: userId},
        omit: {password: true}
    })
    return user; 
}








