import express from 'express'
import multer from 'multer'

import { prodectedRoute } from '../middleware/auth.middleware.js'


import { getMessages, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/:id', prodectedRoute, getMessages)

router.post('/send/:id', prodectedRoute, upload.single('image'), sendMessage)

export default router