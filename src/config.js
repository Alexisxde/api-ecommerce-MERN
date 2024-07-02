import { createPool } from 'mysql2/promise'

export const HOST = process.env.HOST ?? 'localhost'
export const USER = process.env.USER ?? 'root'
export const PASSWORD = process.env.PASSWORD ?? ''
export const PORT = parseInt(process.env.PORT ?? '3000', 10)
export const DATABASE = process.env.DATABASE ?? 'ecommerce'

export const conexion = createPool({
  host: HOST,
  user: USER,
  port: 3306,
  password: PASSWORD,
  database: DATABASE
})
