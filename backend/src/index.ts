import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import { userRouter } from "./api/user/routers";
import { classRouter } from "./api/class/routers";
import { cartRouter } from "./api/cart/routers";
import { enrolledRouter } from "./api/enrolled/routers";
import { paymentRouter } from "./api/payment/routers";
import { appliedRouter } from "./api/applied/routes";
import { authenticatorRouter } from "./api/authentication/routers";
import { imagesRouter } from "./api/images/routers";
import { subscribedRouter } from "./api/subscribed/routers";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize MongoDB connection
connectToDatabase().then(() => {
  console.log("Database connected successfully");

  // Register routes
  app.use("/", authenticatorRouter)
  app.use("/", userRouter);
  app.use("/", classRouter);
  app.use("/", cartRouter);
  app.use("/", enrolledRouter);
  app.use("/", paymentRouter);
  app.use("/", appliedRouter);
  app.use("/", imagesRouter);
  app.use("/", subscribedRouter)

  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the backend server!");
  });

  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error("Failed to connect to database", error);
});
