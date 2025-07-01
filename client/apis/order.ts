import request from 'superagent'
import { OrderProduct } from '../../models/ridiculuxe'

const rootURL = new URL(`/api/v1/order`, document.baseURI)

export async function createOrderProduct(order: OrderProduct) {
  const response = await request.post(`${rootURL}`).send(order)
  if (!response) {
    throw new Error('Error creating order')
  } else {
    return response.body
  }
}
