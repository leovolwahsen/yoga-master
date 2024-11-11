import express from "express";
import * as classController from "./controller";
import { verifyAdmin, verifyInstructor, verifyJWT } from "../authentication/controller";

export const classRouter = express.Router();

classRouter.post("/new-class", verifyJWT, verifyInstructor, classController.createClass);
classRouter.get("/classes", verifyJWT, classController.getAllClasses);
classRouter.get("/class/:id", classController.getClassById);
classRouter.get("/class/:email", verifyJWT, verifyInstructor, classController.getClassByEmail);
classRouter.get("/classes-manage", classController.getManagedClasses);
classRouter.patch("/change-status/:id", verifyJWT, verifyAdmin, classController.updateClassStatusById);
classRouter.get("/approved-classes", classController.getApprovedClasses);
classRouter.put("/update-class/:id", verifyJWT, verifyInstructor, classController.updateClassById);
