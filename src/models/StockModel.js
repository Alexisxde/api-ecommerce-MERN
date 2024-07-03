import { conexion } from '../config.js'

export async function getAllStock(active = 'all') {
  if (active === 'all') return conexion.query('SELECT * FROM stock')
  return conexion.query('SELECT * FROM stock WHERE is_active = ?', [active])
}

export async function getStockById(id_product) {
  const [result] = await conexion.query(
    'SELECT * FROM stock WHERE id_product = ?',
    [id_product]
  )
  return result
}

export async function getStockByIdAndSize(id_product, size) {
  const [result] = await conexion.query(
    'SELECT * FROM stock WHERE id_product = ? AND size = ?',
    [id_product, size]
  )
  return result
}

export async function getAllStockBySize(size) {
  const [result] = await conexion.query('SELECT * FROM stock WHERE size = ?', [
    size
  ])
  return result
}

export async function addStockAndSize(data) {
  const { id_product, size, quantity, is_active } = data
  const [existingRecord] = await conexion.query(
    'SELECT * FROM stock WHERE id_product = ? AND size = ?',
    [id_product, size]
  )
  if (existingRecord.length > 0) {
    throw new Error('The specified size for this product already exists.')
  }
  const [stock] = await getAllStock()
  const [response] = await conexion.query(
    `INSERT INTO stock
      (id_stock, id_product, size, quantity, is_active)
    VALUES (?, ?, ?, ?, ?)`,
    [stock.length + 1, id_product, size, quantity, is_active]
  )
  if (response.affectedRows === 0) {
    throw new Error('An unexpected error occurred so please try again later.')
  }
  return 'Size added correctly!'
}

export async function updateStockFields(id_product, size, fieldsToUpdate) {
  if (size === undefined) {
    throw new Error('Required size field.')
  }
  const fieldNames = Object.keys(fieldsToUpdate)
  const fieldValues = Object.values(fieldsToUpdate)
  const setClause = fieldNames.map(fieldName => `${fieldName} = ?`).join(', ')
  const sqlValues = [...fieldValues, id_product, size]
  const [response] = await conexion.query(
    `UPDATE stock 
       SET ${setClause}
       WHERE id_product = ? AND size = ?`,
    sqlValues
  )
  if (response.affectedRows === 0) {
    throw new Error('Size does not exist.')
  }
  return 'Updated correctly!'
}

export async function deleteSize(id_product, size) {
  const [stock] = await getStockByIdAndSize(id_product, size)
  if (stock.is_active === 0) throw new Error('Size is already removed.')
  const [response] = await conexion.query(
    `UPDATE stock 
     SET is_active = 0
     WHERE id_product = ? AND size = ?`,
    [id_product, size]
  )
  if (response.affectedRows === 0) {
    throw new Error('Product ID does not exist.')
  }
  return `Size ${size} removed.`
}
