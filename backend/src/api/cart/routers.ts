import express from "express";
import * as cartController from "./controller";

export const cartRouter = express.Router();

cartRouter.post("/add-to-cart", cartController.createCartItem);
cartRouter.get("/cart-item/:id", cartController.getCartItemById);
cartRouter.get("/cart/:email", cartController.getCartItemByEmail);
cartRouter.get("/delete-cart-item/:id", cartController.deleteCartItemById);