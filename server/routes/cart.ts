import { Router } from 'express'

import * as db from '../db/cart.ts'

const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await db.getCartByUser(id)
    if (!product) res.status(404).json('No shopping cart found with this ID')
    else res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const { productId, quantity } = req.body
    await db.addToCart({ userId, productId, quantity })
    const newCart = await db.getCartByUser(userId)
    if (!newCart) res.status(404).json('No shopping cart found with this ID')
    else res.json(newCart)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const { cart } = req.body
    await db.updateCart({ userId, cart })
    const newCart = await db.getCartByUser(userId)
    if (!newCart) res.status(404).json('No shopping cart found with this ID')
    else res.json(newCart)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const { productId } = req.body
    await db.deleteFromCart({ userId, productId })
    const newCart = await db.getCartByUser(userId)
    res.status(200).json(newCart)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
