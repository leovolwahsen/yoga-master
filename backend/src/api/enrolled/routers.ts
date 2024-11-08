import express from "express";
import * as enrolledController from "./controller";

export const enrolledRouter = express.Router();

enrolledRouter.get("/popular-classes", enrolledController.getEnrolledClasses);
enrolledRouter.get("/popular-instructors", enrolledController.getEnrolledInstructors);
enrolledRouter.get("/admin-status", enrolledController.getAdminStatus);
enrolledRouter.get("/instructors", enrolledController.getAllInstructors);
enrolledRouter.get("/enrolled-classes/:email", enrolledController.getEnrolledClassesByEmail);