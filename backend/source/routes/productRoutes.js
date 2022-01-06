import express from "express";
import { getProduct, getProductById, deleteProductById, createProduct, updateProduct, reviewProduct, filterProduct } from '../controllers/productController.js'
import { checkLogin, checkAdmin } from '../middleware/autheMiddleware.js'
import { validate } from '../middleware/validationMiddleware.js'
import { uploadFile, updateFile } from '../middleware/createProductMiddleware.js'
const router = express.Router()

router.get('/filter', filterProduct)
router.get('/:id', getProductById)
router.delete('/:id', checkLogin, checkAdmin, deleteProductById)
router.get('/', getProduct)
router.post('/', checkLogin, checkAdmin, uploadFile, createProduct)
router.put('/:id', checkLogin, checkAdmin, updateFile, updateProduct)

router.post('/review/:id', checkLogin, validate('reviewProduct'), reviewProduct)

export default router