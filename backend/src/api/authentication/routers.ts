import express from "express";
import * as authenticatorController from "./controller";

export const authenticatorRouter = express.Router();

authenticatorRouter.post("/set-token", authenticatorController.createToken);