import express from "express";
import { createDeliveryAddress, getDeliveryAddressList, deleteDeliveryAddress } from '../controllers/deliveryAddressController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'

const router = express.Router()

router.delete('/', checkLogin, deleteDeliveryAddress)
router.post('/', checkLogin, createDeliveryAddress)
router.get('/', checkLogin, getDeliveryAddressList)


export default router