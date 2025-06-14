import express from 'express'
import multer from 'multer'
import { getUsersForSidebar } from '../controllers/user.controller.js'
import { prodectedRoute } from '../middleware/auth.middleware.js'
import { updateProfile } from '../controllers/user.controller.js'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/', prodectedRoute, getUsersForSidebar)
router.post('/update-profile', prodectedRoute, upload.single('profilePic'), updateProfile)

export default router