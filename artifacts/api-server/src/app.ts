import express, { type Express } from "express";
import cors from "cors";
const pinoHttp = require("pino-http").default || require("pino-http");
import session from "express-session";
import path from "path";
import fs from "fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// ✅ Logger middleware (fixed for Vercel + TS)
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// ✅ CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// ✅ Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET || "sunny-concepts-secret-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Uploads directory setup
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ✅ Static file serving
app.use("/api/uploads", express.static(UPLOADS_DIR));

// ✅ Routes
app.use("/api", router);

// ✅ Export app
export default app;
