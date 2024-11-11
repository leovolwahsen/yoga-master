import express from "express";
import * as cartController from "./controller";
import { verifyJWT } from "../authentication/controller";

export const cartRouter = express.Router();

cartRouter.post("/add-to-cart", verifyJWT, cartController.createCartItem);
cartRouter.get("/cart-item/:id", verifyJWT, cartController.getCartItemById);
cartRouter.get("/cart/:email", verifyJWT, cartController.getCartItemByEmail);
cartRouter.delete("/delete-cart-item/:id", verifyJWT, cartController.deleteCartItemById);