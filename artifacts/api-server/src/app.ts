import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import fs from "fs";
import router from "./routes";
import { logger } from "./lib/logger";

// Safe require for pino
const pinoHttp = require("pino-http");

const app: Express = express();

// Logger
app.use(
  pinoHttp({
    logger,
  }),
);

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⚠️ Disable file system in production (Vercel serverless)
if (process.env.NODE_ENV !== "production") {
  const UPLOADS_DIR = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  app.use("/api/uploads", express.static(UPLOADS_DIR));
}

// Routes
app.use("/api", router);

export default app;
