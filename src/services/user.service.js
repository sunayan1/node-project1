import { StatusCodes } from "http-status-codes";
import { Prisma, PrismaClient } from "@prisma/client";
import { checkPassword, generateHashForPassword } from "../libs/password-utility.js";
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
        throw new Error("Invalid Credentials", {cause: "CustomeError"})
    }

   const isPasswordSame= await checkPassword(password, user.password)

   
    if(!isPasswordSame){
        throw new Error("Invalid Credentials", {cause: "CustomeError"})
        
    }
    delete user.password; 
    return {message: "login successfull",user};
};


export const allUsersService= async ()=>{
    return await prisma.user.findMany();
}



export const WriteuserService=async(loginData)=>{
    

    const hashedPassword= await generateHashForPassword(loginData.password);
    const res = await prisma.user.create({
        data: {
            id:loginData.id,
            fullName:loginData.fullName,
            email:loginData.email,
            password:hashedPassword,
            gender:loginData.gender,
            },
            omit: {
                password:true,
            }

    })
    return res

}



const writeUser=await prisma.user.findMany({

})
console.dir(writeUser,{depth:null})




