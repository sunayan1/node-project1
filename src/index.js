import express from "express";
import "dotenv/config";
import statusCodes from "http-status-codes";
import userRouter from "./routes/user.routes.js";
import bodyParser from "body-parser";
import { errorHandler } from "./libs/errorhandler.js";
import cors from "cors";
import postRouter from "./routes/post.routes.js";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { socketHandler } from "./socket/socket.js";

const app = express();
const PORT = process.env.PORT;
export const httpServer = createServer(app);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my app" });
});

app.use(cors());
app.use(bodyParser.json());
userRouter.get("/", (req, res) => {
  res.status(200).json({ message: "welome to this websitee" });
});

app.use("/api/users", userRouter);
app.use("/api/post", postRouter);

socketHandler(httpServer);

console.log(process.env.PORT);

app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
