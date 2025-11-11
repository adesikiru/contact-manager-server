import express from 'express'
import dotenv from 'dotenv'
import './config/db.js'
import cors from 'cors'
import { Router } from './routes/routes.js'

const app = express()
app.use(express.json())
app.use(cors({
  origin: ["https://contact-manager-client-rose.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use('/contactmsyt', Router)
dotenv.config();
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Serv
    er is running on http://localhost:${PORT} ademOla
    `)
}) 