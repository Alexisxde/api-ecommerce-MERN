import {
  addProduct as addProductModel,
  deleteProduct as deleteProductModel,
  getAllProducts as getAllProductsModel,
  getProductByIdJOIN as getProductByIdModel,
  updateProduct as updateProductModel
} from '../models/ProductModel.js'
import { toNewProduct, toUpdateProduct } from '../utils.js'

export async function getAllProducts(req, res) {
  try {
    const { active = 'all', page } = req.query
    const [products] = await getAllProductsModel(active, page)
    if (active !== 'all' && active !== '1' && active !== '0') {
      return res.status(404).json({
        type: 'error',
        message: "query variable active can only be equal to ('all', 1, 0)."
      })
    }
    return res
      .json({
        results: products,
        page,
        total_products: products.length
      })
      .status(200)
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
    return res.json(product).status(200)
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

export async function addProduct(req, res) {
  try {
    const data = toNewProduct(req.body)
    await addProductModel(data)
    return res
      .json({ type: 'success', message: 'Product added correctly!' })
      .status(200)
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

export async function updateProduct(req, res) {
  try {
    const { id_product, ...data } = req.body
    toUpdateProduct(req.body)
    await updateProductModel(id_product, data)
    return res
      .json({ type: 'success', message: 'Product updated correctly!' })
      .status(200)
  } catch (error) {
    res.status(500).json({ type: 'error', message: error.message })
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id_product } = req.body
    const response = await deleteProductModel(id_product)
    if (!response) {
      return res
        .json({ type: 'error', message: 'Product is already removed.' })
        .status(404)
    }
    return res
      .json({ type: 'success', message: 'Product removed.' })
      .status(200)
  } catch (error) {
    res.status(404).json({ type: 'error', message: error.message })
  }
}
