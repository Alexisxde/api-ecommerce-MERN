function formatPrice(price, key) {
  const regex = /^\d{1,3}(\.\d{3})*(,\d{2})$/
  if (!regex.test(price)) {
    throw new Error(
      `Invalid ${key} price format. It must be in the format 'xxx.xxx,xx'.`
    )
  }
  return price
}

const parseString = (stringFromRequest, key) => {
  if (stringFromRequest === undefined) {
    throw new Error(`Required ${key} field.`)
  }
  if (stringFromRequest === '') {
    throw new Error(`The ${key} field cannot be empty.`)
  }
  if (typeof stringFromRequest !== 'string') {
    throw new Error(`Incorrect or missing ${key}.`)
  }
  return stringFromRequest
}

const parseNumber = (numberFromRequest, key) => {
  if (numberFromRequest === undefined) {
    throw new Error(`Required ${key} field.`)
  }
  if (numberFromRequest === '') {
    throw new Error(`The ${key} field cannot be empty.`)
  }
  if (typeof numberFromRequest !== 'number') {
    throw new Error(`Incorrect or missing ${key}.`)
  }
  if (key === 'quantity' && numberFromRequest < 0) {
    throw new Error('The stock quantity cannot be less than 0.')
  }
  return numberFromRequest
}

const parseBoolean = (stringFromRequest, key) => {
  if (stringFromRequest === undefined) {
    throw new Error(`Required ${key} field.`)
  }
  if (stringFromRequest === '') {
    throw new Error(`The ${key} field cannot be empty.`)
  }
  const validValues = ['1', '0', '"0"', '"1"', 1, 0]
  if (!validValues.includes(stringFromRequest)) {
    throw new Error(`Invalid value for ${key}.`)
  }
  return stringFromRequest
}

export function toNewProduct(data) {
  const newProduct = {
    model: parseString(data.model, 'model'),
    brand: parseString(data.brand, 'brand'),
    img: 'NULL',
    is_active: parseBoolean(data.is_active, 'is_active'),
    stars: parseString(data.stars, 'stars'),
    discount: parseString(data.discount, 'discount'),
    description: parseString(data.description, 'description'),
    purchase_price: formatPrice(
      parseString(data.purchase_price, 'purchase_price'),
      'purchase_price'
    ),
    sale_price: formatPrice(
      parseString(data.sale_price, 'sale_price'),
      'sale_price'
    )
  }
  return newProduct
}

export function toUpdateProduct(data) {
  const nonEmptyFields = {}
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key]
      if (value === '') {
        throw new Error(`The ${key} field cannot be empty.`)
      }
      if (key === 'purchase_price' || key === 'sale_price') {
        value = formatPrice(parseString(data[key], key), key)
      }
      if (value !== undefined && value !== null && value !== '') {
        nonEmptyFields[key] = value
      }
    }
  }
  return nonEmptyFields
}

export function toNewStockAndSize(data) {
  const newStockAndSize = {
    id_product: parseString(data.id_product, 'id_product'),
    size: parseNumber(data.size, 'size'),
    quantity: parseNumber(data.quantity, 'quantity'),
    is_active: parseBoolean(data.is_active, 'is_active')
  }
  return newStockAndSize
}

export function toUpdateSizeStock(data) {
  const updateSizeStock = {
    id_product: parseString(data.id_product, 'id_product'),
    size: parseNumber(data.size, 'size'),
    quantity: parseNumber(data.quantity, 'quantity')
  }
  return updateSizeStock
}

export function toUpdateStock(data) {
  const nonEmptyFields = {}
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key]
      if (value === '') {
        throw new Error(`The ${key} field cannot be empty.`)
      }
      if (key === 'size' || key === 'quantity') {
        value = parseNumber(data[key], key)
      }
      if (value !== undefined && value !== null && value !== '') {
        nonEmptyFields[key] = value
      }
    }
  }
  return nonEmptyFields
}
