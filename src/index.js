import express from "express"
import  'dotenv/config'
import statusCodes from "http-status-codes";
import userRouter from "./routes/user.routes.js";
import bodyParser from "body-parser";
import { errorHandler } from "./libs/errorhandler.js";
import cors from "cors"


const app= express()
const PORT=process.env.PORT
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to my app"})
});

app.use(cors());
app.use(bodyParser.json())
userRouter.get("/",(req,res)=>{
    res.status(200).json({message:"welome to this websitee"})

});


app.use("/api/users", (userRouter));

console.log(process.env.PORT);


app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
    
});

