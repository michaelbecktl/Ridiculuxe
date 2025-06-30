import express, { Request, Response } from 'express'
import * as db from '../db/order'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.getOrder(id)
    if (!result) res.status(404).json(`No orders found with ID ${id}`)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong. Please try again' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const { user_id, name, email, address1, address2, address3 } = req.body

  if (!name || !email || !address1) {
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
    res.json(newOrderId)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong. Please try again' })
  }
})

export default router
