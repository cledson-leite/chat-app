import express from 'express'

import { prodectedRoute } from '../middleware/auth.middleware.js'


import { getMessages, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()


router.get('/:id', prodectedRoute, getMessages)

router.post('/send/:id', prodectedRoute, sendMessage)

export default router