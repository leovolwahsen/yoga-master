import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import { userRouter } from "./api/user/routers";


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
  app.use("/api/users", userRouter);

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello Developers in the future!");
  });

  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error("Failed to connect to database", error);
});
