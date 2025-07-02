import express, { Request, Response } from 'express'
import * as db from '../db/functions/order'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const result = await db.createOrderProduct(req.body)
    if (!result) res.status(404).json(`Unable to create product row`)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong. Please try again' })
  }
})

export default router
