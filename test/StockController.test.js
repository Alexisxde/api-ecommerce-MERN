import { describe, expect, test, vi } from 'vitest'
import {
  getAllStock,
  getStockById
} from '../src/controllers/StockController.js'

describe('getAllStock', () => {
  test('should return an array of stock.', async () => {
    const req = { query: { active: 'all' } }
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }
    await getAllStock(req, res)
    expect(res.json).toHaveBeenCalled()
    const responseBody = res.json.mock.calls[0][0]
    expect(Array.isArray(responseBody.results)).toBe(true)
  })

  test('should return object, it has to have the properties type error and a message', async () => {
    const req = { query: { active: 'a' } }
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }
    await getAllStock(req, res)
    expect(res.json).toHaveBeenCalled()
    const responseBody = res.json.mock.calls[0][0]
    expect(typeof responseBody).toBe('object')
    expect(responseBody.type).toBe('error')
    expect(typeof responseBody.message).toBe('string')
  })
})

describe('getStockById', () => {
  test('should return an array of stock by id.', async () => {
    const req = { params: { id: '9a25107e-e279-4879-8976-544214d6a5de' } }
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }
    await getStockById(req, res)
    expect(res.json).toHaveBeenCalled()
    const responseBody = res.json.mock.calls[0][0]
    expect(Array.isArray(responseBody.results)).toBe(true)
  })

  test('should return object, it has to have the properties type error and a message.', async () => {
    const req = { params: { id: '9a25107e-e279-4879-8976-544214d6a5d' } }
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() }
    await getStockById(req, res)
    expect(res.json).toHaveBeenCalled()
    const responseBody = res.json.mock.calls[0][0]
    expect(typeof responseBody).toBe('object')
    expect(responseBody.type).toBe('error')
    expect(typeof responseBody.message).toBe('string')
  })
})
