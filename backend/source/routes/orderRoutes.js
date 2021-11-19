import express from "express";
import { orderProduct, getOrderById, getMyOrder, getOrder, updateOrder } from '../controllers/orderController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
const router = express.Router()

router.post('/', checkLogin, orderProduct)
router.get('/myorders', checkLogin, getMyOrder)
router.get('/:id', checkLogin, getOrderById)
router.get('/', checkLogin, checkAdmin, getOrder)
router.put('/:id/deliver', checkLogin, checkAdmin, updateOrder)

export default router