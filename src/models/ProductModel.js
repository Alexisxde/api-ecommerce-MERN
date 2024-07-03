import { conexion } from '../config.js'
import { v4 as uuidv4 } from 'uuid'

export async function getAllProducts(active = 'all') {
  if (active === 'all') return conexion.query('SELECT * FROM products')
  return conexion.query(`SELECT * FROM products WHERE is_active = ?`, [active])
}

export async function getProductById(id) {
  const [result] = await conexion.query(
    `SELECT * FROM products WHERE id_product = ?`,
    [id]
  )
  return result
}

export async function addProduct(data) {
  const id_product = uuidv4()
  const img = 'img'
  const {
    //img,
    purchase_price,
    sale_price,
    discount,
    brand,
    model,
    stars,
    is_active,
    description
  } = data
  const [response] = await conexion.query(
    `INSERT INTO products 
      (id_product, img, purchase_price, 
      sale_price, discount, brand, model, 
      stars, is_active, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id_product,
      img,
      purchase_price,
      sale_price,
      discount,
      brand,
      model,
      stars,
      is_active,
      description
    ]
  )
  if (response.affectedRows === 0) {
    throw new Error('An unexpected error occurred so please try again later.')
  }
  return 'Product added correctly!'
}

export async function updateProduct(id_product, fieldsToUpdate) {
  const fieldNames = Object.keys(fieldsToUpdate)
  const fieldValues = Object.values(fieldsToUpdate)
  const setClause = fieldNames.map(fieldName => `${fieldName} = ?`).join(', ')
  const sqlValues = [...fieldValues, id_product]
  const [response] = await conexion.query(
    `UPDATE products 
     SET ${setClause}
     WHERE id_product = ?`,
    sqlValues
  )
  if (response.affectedRows === 0) {
    throw new Error('Product ID does not exist.')
  }
  return 'Product updated correctly!'
}

export async function deleteProduct(id_product) {
  const [product] = await getProductById(id_product)
  if (product.is_active === 0) throw new Error('Product is already removed.')
  const [response] = await conexion.query(
    `UPDATE products 
     SET is_active = 0
     WHERE id_product = ?`,
    [id_product]
  )
  if (response.affectedRows === 0) {
    throw new Error('Product ID does not exist.')
  }
  return 'Product removed.'
}
