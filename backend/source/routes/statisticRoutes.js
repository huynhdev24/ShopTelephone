import express from "express";
import { getRevenue, getProductByBrand, getProductBoughtByBrand } from '../controllers/statisticController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
const router = express.Router()


router.get('/revenue', checkLogin, checkAdmin, getRevenue)
router.get('/productBrand', checkLogin, checkAdmin, getProductByBrand)
router.get('/productBoughtBrand', checkLogin, checkAdmin, getProductBoughtByBrand)
export default router