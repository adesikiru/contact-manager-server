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
  "http://localhost:5173", // local dev
  "https://contact-manager-client-rose.vercel.app", // deployed frontend
];

// CORS middleware
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // allow cookies if needed
}));

// Handle preflight OPTIONS requests globally
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Routes
app.use('/contactmsyt', Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
