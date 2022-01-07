import express from "express";
import { createDeliveryAddress, getDeliveryAddressList, deleteDeliveryAddress, updateDeliveryAddress } from '../controllers/deliveryAddressController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
import { validate } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.delete('/', checkLogin, deleteDeliveryAddress)
router.post('/', checkLogin, validate('informationDeliveryAddress'), createDeliveryAddress)
router.get('/', checkLogin, getDeliveryAddressList)
router.put('/:item', checkLogin, validate('informationDeliveryAddress'), updateDeliveryAddress)

export default router