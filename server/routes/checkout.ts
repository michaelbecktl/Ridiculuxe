import express, { Request, Response } from 'express'
import * as db from '../db/order'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const { user_id, name, email, address1, address2, address3 } = req.body

  if (!name || !email || !address1) {
    console.log(req.body)
    return res.status(400).json({ error: 'Please fill all required fields' })
  }

  try {
    const newOrderId = await db.createOrder({
      user_id,
      name,
      email,
      address1,
      address2,
      address3,
    })
    console.log('newOrderId', newOrderId)
    res.status(201).json({ message: 'Order created', orderId: newOrderId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong. Please try again' })
  }
})

export default router
