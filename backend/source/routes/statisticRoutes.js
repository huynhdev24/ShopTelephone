import express from "express";
import {
    getRevenue,
    getProductByBrand,
    getProductBoughtByBrand,
    getNumOrderSuccesMonth,
    getRevenueMonth,
    getNumRegisUser
} from '../controllers/statisticController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
const router = express.Router()


router.get('/revenue', checkLogin, checkAdmin, getRevenue)
router.get('/productBrand', checkLogin, checkAdmin, getProductByBrand)
router.get('/productBoughtBrand', checkLogin, checkAdmin, getProductBoughtByBrand)
router.get('/orderSuccessMonth', checkLogin, checkAdmin, getNumOrderSuccesMonth)
router.get('/revenueMonth', checkLogin, checkAdmin, getRevenueMonth)
router.get('/registerUser', checkLogin, checkAdmin, getNumRegisUser)

export default router