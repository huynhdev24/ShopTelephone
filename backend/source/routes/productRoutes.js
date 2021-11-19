import express from "express";
import { getProduct, getProductById, deleteProductById, createProduct, updateProduct } from '../controllers/productController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
const router = express.Router()

router.get('/:id', getProductById)
router.delete('/:id', checkLogin, checkAdmin, deleteProductById)
router.get('/', getProduct)
router.post('/', checkLogin, checkAdmin, createProduct)
router.put('/:id', checkLogin, checkAdmin, updateProduct)
export default router