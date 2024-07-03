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
