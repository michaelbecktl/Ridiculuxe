
import express from 'express'
import * as Path from 'node:path'

import productRoutes from './routes/product.ts'
import cartRoutes from './routes/cart.ts'
import CheckoutRoutes from './routes/checkout.ts'
import userRoutes from './routes/userRoutes.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/product', productRoutes)
server.use('/api/v1/cart', cartRoutes)
server.use('/api/v1/checkout', CheckoutRoutes)
server.use('/api/v1/user', userRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
