import express from "express";
import { loginUser, profileUser, resgisterUser, updateProfileUser, getAllUsers, getUserById, acceptAdmin} from '../controllers/userController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
const router = express.Router()

router.post('/login', loginUser)
router.get('/', checkLogin, checkAdmin, getAllUsers)
router.get('/:id', checkLogin, checkAdmin, getUserById)
router.post('/resgister', resgisterUser)
router.get('/profile', checkLogin, profileUser)

router.put('/profile', checkLogin, updateProfileUser)
router.put('/api/user/:id', checkLogin, checkAdmin, acceptAdmin)

// router.get('/', getProduct)

export default router