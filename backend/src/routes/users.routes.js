import express from 'express'
import { getUsersForSidebar } from '../controllers/user.controller.js'
import { prodectedRoute } from '../middleware/auth.middleware.js'
import { updateProfile } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', prodectedRoute, getUsersForSidebar)
router.post('/update-profile', prodectedRoute, updateProfile)

export default router