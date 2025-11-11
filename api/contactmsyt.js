import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import './config/db.js';
import { Router } from "../routes/routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // local client
  "https://contact-manager-client-rose.vercel.app", // deployed client
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from this origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Handle preflight OPTIONS
app.options("*", cors({ origin: allowedOrigins, credentials: true }));

// Your API routes
app.use("/contactmsyt", Router);

// Export for Vercel
export default app;
