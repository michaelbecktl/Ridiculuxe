import { Router } from 'express'

import * as db from '../db/functions/product.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const products = await db.getAllProducts()
    res.json(products)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong with getAllProducts' })
  }
})

router.get('/name/:name', async (req, res) => {
  try {
    const { name } = req.params
    const product = await db.getProductByName(name)
    if (!product) res.status(404).json('No product with this name')
    else res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await db.getProductById(id)
    if (!product) res.status(404).json('No product with this ID')
    else res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/stock/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { quantity } = req.body
    const { stock } = await db.getProductById(id)

    if (stock <= 0) {
      res.status(416).json('Item not available')
    } else if (stock < quantity) {
      res.status(416).json('Not enough stock for this order')
    } else {
      await db.soldProduct(id, quantity)
      res.status(200).json('Product stock reduced successfully')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
