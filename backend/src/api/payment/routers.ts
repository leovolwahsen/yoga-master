import express from "express";
import * as paymentController from "./controller";
import { verifyJWT } from "../authentication/controller";

export const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", paymentController.createPaymentIntent);
paymentRouter.post("/payment-info", verifyJWT, paymentController.createPaymentInfo);
paymentRouter.get("/payment-history/:email", paymentController.getPaymentHistoryByEmail);
paymentRouter.get("/payment-history-length/:email", paymentController.getPaymentHistoryLength);