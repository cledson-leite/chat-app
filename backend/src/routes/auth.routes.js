import express from 'express'
import { checkAuth, login, logout, signup } from '../controllers/auth.controller.js'
import { prodectedRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get('/check', prodectedRoute, checkAuth)

export default router