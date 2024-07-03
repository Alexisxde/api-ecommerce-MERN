import express from 'express'
import dotenv from 'dotenv'
import { PORT } from './config.js'
import ProductsRoutes from './routes/products.js'
import StockRoutes from './routes/stock.js'

dotenv.config()
const app = express()
app.use(express.json())

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
  console.log(`Server running on port http://localhost:${PORT}`)
})
