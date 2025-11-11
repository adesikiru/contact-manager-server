import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Router } from './routes/routes.js'
import './config/db.js'

const app = express()
app.use(express.json())
app.use(cors({
  origin: ['https://contact-manager-client-rose.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))
dotenv.config({ path: './config/.env' });
app.use('/contactmsyt', Router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})