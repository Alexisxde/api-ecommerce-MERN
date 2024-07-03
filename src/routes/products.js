import express from 'express'
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/ProductController.js'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', addProduct)
router.put('/', updateProduct)
router.delete('/', deleteProduct)

export default router
