import express from "express";
import * as enrolledController from "./controller";
import { verifyAdmin, verifyJWT } from "../authentication/controller";

export const enrolledRouter = express.Router();

// enrolledRouter.get("/popular-classes", enrolledController.getEnrolledClasses);
// enrolledRouter.get("/popular-instructors", enrolledController.getEnrolledInstructors);
// enrolledRouter.get("/admin-status", verifyJWT, verifyAdmin, enrolledController.getAdminStatus);
// enrolledRouter.get("/instructors", enrolledController.getAllInstructors);
// enrolledRouter.get("/enrolled-classes/:email", verifyJWT, enrolledController.getEnrolledClassesByEmail);
enrolledRouter.get("/popular-classes", enrolledController.getEnrolledClasses);
enrolledRouter.get("/popular-instructors", enrolledController.getEnrolledInstructors);
enrolledRouter.get("/admin-status", verifyAdmin, enrolledController.getAdminStatus);
enrolledRouter.get("/instructors", enrolledController.getAllInstructors);
enrolledRouter.get("/enrolled-classes/:email", enrolledController.getEnrolledClassesByEmail);