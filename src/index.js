import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { PORT } from './config.js'
import ProductsRoutes from './routes/products.js'
import StockRoutes from './routes/stock.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers.authorization || `Bearer ${req.query.api_key}`
  if (!apiKey || apiKey !== `Bearer ${process.env.API_KEY}`) {
    return res.status(401).json({ message: 'Please obtain a API key.' })
  }
  next()
}

app.use('/api/products', validateApiKey, ProductsRoutes)
app.use('/api/stock', validateApiKey, StockRoutes)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port http://localhost:${PORT}`)
})
