import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import messageRoutes from './routes/message.routes.js'
import { connectDB } from './lib/db.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/message', messageRoutes)

const PORT = process.env.PORT || 8080

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta:  ${PORT}`)
  })
})