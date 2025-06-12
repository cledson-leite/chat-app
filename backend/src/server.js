import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import { connectDB } from './lib/db.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 8080

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta:  ${PORT}`)
  })
})