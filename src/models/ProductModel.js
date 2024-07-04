import { v4 as uuidv4 } from 'uuid'
import { conexion } from '../config.js'

export async function getAllProducts(active = 'all', page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize
  if (active === 'all') {
    return conexion.query('SELECT * FROM products LIMIT ? OFFSET ?', [
      pageSize,
      offset
    ])
  }
  return conexion.query(
    'SELECT * FROM products WHERE is_active = ? LIMIT ? OFFSET ?',
    [active, pageSize, offset]
  )
}

async function getProductById(id) {
  const [result] = await conexion.query(
    'SELECT * FROM products WHERE id_product = ?',
    [id]
  )
  if (result.length === 0) throw new Error('Product id does not exist.')
  return result
}

export async function getProductByIdJOIN(id) {
  const [result] = await conexion.query(
    `SELECT products.*, stock.id_stock, stock.size, stock.quantity, stock.is_active AS stock_status
    FROM products INNER JOIN stock ON stock.id_product = products.id_product
    WHERE products.id_product = ? AND stock.is_active = 1`,
    [id]
  )
  if (result.length === 0) throw new Error('Product id does not exist.')
  const {
    id_product,
    // img,
    purchase_price,
    sale_price,
    discount,
    brand,
    model,
    stars,
    is_active,
    description,
    stock_status
  } = result[0]
  const stock = result.map(({ id_stock, size, quantity }) => {
    return {
      id_stock,
      size,
      quantity,
      stock_status
    }
  })
  const product = {
    id_product,
    // img,
    purchase_price,
    sale_price,
    discount,
    brand,
    model,
    stars,
    is_active,
    description,
    stock
  }
  return product
}

export async function addProduct(data) {
  const id_product = uuidv4()
  const img = 'img'
  const {
    // img,
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
  return true
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
    throw new Error('An unexpected error occurred so please try again later.')
  }
  return true
}

export async function deleteProduct(id_product) {
  const [product] = await getProductById(id_product)
  if (product.is_active === 0) return false
  await conexion.query(
    `UPDATE products 
     SET is_active = 0
     WHERE id_product = ?`,
    [id_product]
  )
  return true
}
