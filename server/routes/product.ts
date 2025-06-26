import { Router } from 'express'

import * as db from '../db/product.ts'

const router = Router()

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params
    const product = await db.getProductById(name)
    if (!product) res.status(404).json('No product with this ID')
    else res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
