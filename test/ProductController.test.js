import { describe, expect, it, test, vi } from 'vitest'
import {
  getAllProducts,
  getProductById
} from '../src/controllers/ProductController.js'

describe('getAllProducts', () => {
  it('should return an array of products.', async () => {
    const req = { query: { active: 'all', page: '1' } }
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }
    await getAllProducts(req, res)
    expect(res.json).toHaveBeenCalled()
    const responseBody = res.json.mock.calls[0][0]
    expect(Array.isArray(responseBody.results)).toBe(true)
  })

  test('should return object, it has to have the properties type error and a message', async () => {
    const req = { query: { active: 'a', page: '1' } }
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }
    await getAllProducts(req, res)
    expect(res.json).toHaveBeenCalled()
    const responseBody = res.json.mock.calls[0][0]
    expect(typeof responseBody).toBe('object')
    expect(responseBody.type).toBe('error')
    expect(typeof responseBody.message).toBe('string')
  })
})

describe('getProductById', () => {
  test('should return an object of one product.', async () => {
    const req = { params: { id: '2356a62a-3106-4cbb-8b43-a6950eb20111' } }
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }
    await getProductById(req, res)
    expect(res.json).toHaveBeenCalled()
    const responseBody = res.json.mock.calls[0][0]
    expect(typeof responseBody).toBe('object')
    expect(typeof responseBody.id_product).toBe('string')
    expect(responseBody.stock.length > 0).toBe(true)
  })

  test('should return object, it has to have the properties type error and a message.', async () => {
    const req = { params: { id: '2356a62a-3106-4cbb-8b43-a6950eb2011' } }
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }
    await getProductById(req, res)
    expect(res.json).toHaveBeenCalled()
    const responseBody = res.json.mock.calls[0][0]
    expect(typeof responseBody).toBe('object')
    expect(responseBody.type).toBe('error')
    expect(typeof responseBody.message).toBe('string')
  })
})
