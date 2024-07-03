import {
  getAllProducts as getAllProductsModel,
  getProductById as getProductByIdModel,
  addProduct as addProductModel,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel
} from '../models/ProductModel.js'
import { toNewProduct, toUpdateProduct } from '../utils.js'

export async function getAllProducts(req, res) {
  try {
    const [products] = await getAllProductsModel(req.query.active)
    res.json({
      result: products,
      page: 1,
      total_products: products.length
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getProductById(req, res) {
  try {
    const id = req.params.id
    const product = await getProductByIdModel(id)
    if (product.length === 0) {
      return res
        .status(404)
        .json({ type: 'error', message: 'Product not found.' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function addProduct(req, res) {
  try {
    const data = toNewProduct(req.body)
    const response = await addProductModel(data)
    res.json({ type: 'success', message: response })
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

export async function updateProduct(req, res) {
  try {
    const { id_product, ...data } = req.body
    toUpdateProduct(req.body)
    const response = await updateProductModel(id_product, data)
    res.json({ type: 'success', message: response })
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id_product } = req.body
    const response = await deleteProductModel(id_product)
    res.json({ type: 'success', message: response })
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}
