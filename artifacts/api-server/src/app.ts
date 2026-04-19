import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

// Enable CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", router);

// Export app for Vercel
export default app;
