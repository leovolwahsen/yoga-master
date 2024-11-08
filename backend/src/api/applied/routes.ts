import express from "express";
import * as appliedController from "./controller"

export const appliedRouter = express.Router();

appliedRouter.post("/new-instructor-applicant", appliedController.createNewInstructorApplicant);
appliedRouter.get("/applied-instructor/:email", appliedController.getInstructorByEmail);