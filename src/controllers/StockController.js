import {
  getAllStock as getAllStockModel,
  getStockById as getStockByIdModel,
  getAllStockBySize as getAllStockBySizeModel,
  addStockAndSize as addStockAndSizeModel,
  updateStockFields as updateStockFieldsModel,
  deleteSize as deleteSizeModel
} from '../models/StockModel.js'
import { toNewStockAndSize, toUpdateStock } from '../utils.js'

export async function getAllStock(req, res) {
  try {
    const [stock] = await getAllStockModel(req.query.active)
    if (stock.length === 0) {
      return res
        .status(404)
        .json({ type: 'error', message: 'No stock of the products found.' })
    }
    res.json({
      result: stock,
      total_stock: stock.length
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getStockById(req, res) {
  try {
    const id = req.params.id
    const stock = await getStockByIdModel(id)
    if (stock.length === 0) {
      return res
        .status(404)
        .json({ type: 'error', message: 'Stock ID not found.' })
    }
    res.json({
      result: stock,
      total_stock: stock.length
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getAllStockBySize(req, res) {
  try {
    const size = req.params.size
    const stock = await getAllStockBySizeModel(size)
    if (stock.length === 0) {
      return res.status(404).json({ type: 'error', message: 'Size not found.' })
    }
    res.json({
      result: stock,
      total_stock: stock.length
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function addStockAndSize(req, res) {
  try {
    const data = toNewStockAndSize(req.body)
    const response = await addStockAndSizeModel(data)
    res.json({ type: 'success', message: response })
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

export async function updateStockFields(req, res) {
  try {
    const { id_product, size, ...data } = req.body
    toUpdateStock(req.body)
    const response = await updateStockFieldsModel(id_product, size, data)
    res.json({ type: 'success', message: response })
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

export async function deleteSize(req, res) {
  try {
    const { id_product, size } = req.body
    const response = await deleteSizeModel(id_product, size)
    res.json({ type: 'success', message: response })
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}