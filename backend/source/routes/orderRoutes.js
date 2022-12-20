import express from "express";
import { orderProduct, getOrderById, getMyOrder, getOrder, updateOrder, destroyOrder, confirmReceivedOrder } from '../controllers/orderController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
import { validate } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/', checkLogin, validate('informationOrderProduct'), orderProduct)
router.get('/myorders', checkLogin, getMyOrder)
router.get('/:id', checkLogin, getOrderById)
router.get('/', checkLogin, checkAdmin, getOrder)
// cập nhật vào danh sách api truyền từ req.body orderStatus
router.put('/:id/status', checkLogin, checkAdmin, updateOrder)
router.put('/:id/destroy', checkLogin, destroyOrder)
router.put('/:id/confirmReceived', checkLogin, confirmReceivedOrder)

export default router