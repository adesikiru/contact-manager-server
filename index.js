import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import './config/db.js';
import cors from 'cors';
import { Router } from './routes/routes.js';

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://contact-manager-client-rose.vercel.app",
];



app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like Postman or server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
