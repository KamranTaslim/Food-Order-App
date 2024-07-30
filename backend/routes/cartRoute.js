import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addItemsToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addItemsToCart);
cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);

export default cartRouter;
