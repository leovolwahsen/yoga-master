import express from "express";
import * as imagesController from "./controller";

export const imagesRouter = express.Router();

imagesRouter.get("/images", imagesController.getAllImages);