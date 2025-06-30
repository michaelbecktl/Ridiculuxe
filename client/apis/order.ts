import request from 'superagent'
import { OrderProduct } from '../../models/ridiculuxe'

const rootURL = new URL(`/api/v1/order`, document.baseURI)

export async function getOrder(id: string) {
  const response = await request.get(`${rootURL}/${id}`)
  if (!response) {
    throw new Error('Error creating order')
  } else {
    return response.body
  }
}

export async function createOrderProduct(order: OrderProduct) {
  const response = await request.post(`${rootURL}`).send(order)
  if (!response) {
    throw new Error('Error creating order')
  } else {
    return response.body
  }
}
