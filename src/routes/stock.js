import express from 'express'
import {
  getAllStock,
  getStockById,
  getAllStockBySize,
  addStockAndSize,
  updateStockFields,
  deleteSize
} from '../controllers/StockController.js'

const router = express.Router()

router.get('/', getAllStock)
router.get('/:id', getStockById)
router.get('/sizes/:size', getAllStockBySize)
router.post('/', addStockAndSize)
router.put('/', updateStockFields)
router.delete('/', deleteSize)

export default router
