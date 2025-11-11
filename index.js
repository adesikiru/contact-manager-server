import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import './config/db.js';
import cors from 'cors';
import { Router } from './routes/routes.js';

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://contact-manager-client-rose.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options('*', cors()); // optional preflight support

app.use('/contactmsyt', Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
