import express from "express";
import cors from "cors";
import { Router } from "../routes/routes.js"; // adjust path if needed
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://contact-manager-client-rose.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Mount your routes
app.use("/contactmsyt", Router);

export default app;
