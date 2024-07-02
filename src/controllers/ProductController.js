import {
  getAllProducts as getAllProductsModel,
  getProductById as getProductByIdModel
} from '../models/ProductModel.js'

export async function getAllProducts(_reg, res) {
  try {
    const [products] = await getAllProductsModel()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getProductById(req, res) {
  try {
    const id = req.params.id
    const product = await getProductByIdModel(id)
    if (product.length === 0)
      return res.status(404).json({ message: 'Producto no encontrado.' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
