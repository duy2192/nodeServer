import dotenv from 'dotenv'
import express from "express";
import cors from"cors";
import morgan from "morgan";
import authRouter from "./src/routes/AuthRouter";
import categoryRouter from "./src/routes/CategoriesRouter";
import manufacturerRouter from "./src/routes/ManufacturerRouter";
import productRouter from "./src/routes/ProductRouter";
import orderRouter from "./src/routes/OrderRouter";
import publicRouter from "./src/routes/PublicRouter";
import uploadRouter from "./src/routes/UploadRouter";
import { createServer } from 'http'
import { Server } from "socket.io";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const server=createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.get("/", async(req, res) => {
  res.status(200).send("Welcome to my NodeServer!");

});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));


app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/manufacturer", manufacturerRouter);
app.use("/product", productRouter);

app.use("/order", orderRouter);
app.use("/public", publicRouter);
app.use("/uploads", uploadRouter);
 

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


io.on("connection", (socket) => {
  socket.on("newOrder", (data) => {
    io.emit("receiveNewOrder", data);
  });
});

