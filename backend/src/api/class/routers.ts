import express from "express";
import * as classController from "./controller";

export const classRouter = express.Router();

classRouter.post("/new-class", classController.createClass);
classRouter.get("/classes", classController.getAllClasses);
classRouter.get("/class/:id", classController.getClassById);
classRouter.get("/class/:email", classController.getClassByEmail);
classRouter.get("/classes-manage", classController.getManagedClasses);
classRouter.get("/change-status/:id", classController.updateClassStatusById);
classRouter.get("/approved-classes", classController.getApprovedClasses);
classRouter.put("/update-class/:id", classController.updateClassById);