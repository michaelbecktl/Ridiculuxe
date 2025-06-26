import express from 'express'
import * as db from '../db/functions/user'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0.js'

const router = express.Router()

router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
  try {
    const auth0Id = String(req.auth?.sub)
    const { name, email, address1, address2, address3 } = req.body
    const user = { auth0Id, name, email, address1, address2, address3 }
    await db.createUserProfile(user)
    res.status(201)
  } catch (e) {
    next(e)
  }
})

router.get('/', checkJwt, async (req: JwtRequest, res, next) => {
  try {
    const auth0Id = String(req.auth?.sub)
    const user = await db.getUserProfileByAuth(auth0Id)
    if (typeof user == 'undefined') {
      return res.sendStatus(404)
    } else {
      return res.json(user)
    }
  } catch (e) {
    next(e)
  }
})

export default router
