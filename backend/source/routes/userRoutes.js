import express from "express";
import { loginUser, profileUser, resgisterUser, updateProfileUser, getAllUsers, getUserById, acceptAdmin, getAllOrderOfUser } from '../controllers/userController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
import { validate } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/login', loginUser)    
router.get('/', checkLogin, checkAdmin, getAllUsers)

router.post('/resgister', validate('informationUser'), resgisterUser)
router.get('/profile', checkLogin, profileUser)

router.put('/profile', checkLogin, updateProfileUser)

router.get('/order/:id', checkLogin, checkAdmin, getAllOrderOfUser)
router.get('/:id', checkLogin, checkAdmin, getUserById)
router.put('/:id', checkLogin, checkAdmin, acceptAdmin)



export default router