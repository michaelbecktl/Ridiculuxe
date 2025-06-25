import express from 'express'
import * as db from '../db/order'

const router = express.Router()

router.post('/', async (req, res) => {
  const { product_id, name, email, address1, address2, address3 } = req.body

  if (!product_id || !name || !email || !address1) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const newOrderId = await db.createOrder({
      product_id,
      name,
      email,
      address1,
      address2,
      address3,
    })

    res.status(201).json({ message: 'Order created', orderId: newOrderId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router