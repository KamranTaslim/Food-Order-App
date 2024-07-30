import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config

const app = express();
const port = 4000;

//middleware

app.use(express.json());
app.use(cors());

//api endpoints

app.use("/api/food", foodRoute);
app.use("/images", express.static("uploads")); //for access the image on browser
app.get("/", (req, res) => {
  res.send("Api Working");
});

app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log("Server is running on " + port);
});

//db connection

connectDB();
