import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import './config/db.js';
import cors from 'cors';
import { Router } from './routes/routes.js';

const app = express();
app.use(express.json());

// Allowed origins for development and production
const allowedOrigins = [
  "http://localhost:5173", // dev client
  "https://contact-manager-client-rose.vercel.app", // deployed client
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests like Postman that have no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from this origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies if needed
  })
);

// Handle preflight OPTIONS requests globally
app.options("*", cors({ origin: allowedOrigins, credentials: true }));

// Your API routes
app.use('/contactmsyt', Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
