import { conexion } from '../config.js'

export async function getAllProducts() {
  const results = conexion.query('SELECT * FROM products')
  return results
}

export async function getProductById(id) {
  const [result] = await conexion.query(
    `SELECT * FROM products WHERE id_product = ?`,
    [id]
  )
  return result
}
