import express from 'express'
import {
  addStockAndSize,
  deleteSize,
  getAllStock,
  getAllStockBySize,
  getStockById,
  updateStockFields
} from '../controllers/StockController.js'

const router = express.Router()

router.get('/', getAllStock)
router.get('/:id', getStockById)
router.get('/sizes/:size', getAllStockBySize)
router.post('/', addStockAndSize)
router.put('/', updateStockFields)
router.delete('/', deleteSize)

export default router
