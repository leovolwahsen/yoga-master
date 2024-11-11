import express from "express";
import * as userController from "./controller";
import { verifyJWT } from "../authentication/controller";

export const userRouter = express.Router();

userRouter.post("/new-user", userController.createUser);
userRouter.get("/users", userController.getAllUsers);
userRouter.get("/user/:id", userController.getUserById);
userRouter.get("/user/:email", verifyJWT, userController.getUserByEmail);
userRouter.put("/update-user/:id", userController.updateUserById);
userRouter.delete("/delete-user/:id", verifyJWT, userController.deleteUserById);
