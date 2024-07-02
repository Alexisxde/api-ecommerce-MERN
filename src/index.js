import express from 'express'
import { PORT } from './config.js'
import ProductsRoutes from './routes/products.js'

const app = express()
app.use(express.json())

app.use('/api/products', ProductsRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
