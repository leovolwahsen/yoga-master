import express from "express";
import * as subscribedController from "./controller";

export const subscribedRouter = express.Router();

subscribedRouter.post("/new-subscribed", subscribedController.createSubscribed);
subscribedRouter.get("/all-subscribed", subscribedController.getAllSubscribed);