import request from 'superagent'
import { Order, OrderProduct } from '../../models/ridiculuxe'

const rootURL = new URL(`/api/v1/checkout`, document.baseURI)

export async function getOrder(id: string) {
  const response = await request.get(`${rootURL}/order/${id}`)
  if (!response) {
    throw new Error('Error creating order')
  } else {
    return response.body
  }
}

export async function createOrder(order: Order) {
  const formatted = {
    user_id: order.id,
    name: order.name,
    email: order.email,
    address1: order.address1,
    address2: order.address2,
    address3: order.address3,
  }
  const response = await request.post(rootURL).send(formatted)
  if (!response) {
    throw new Error('Error creating order')
  } else {
    return response.body
  }
}

export async function createOrderProduct(order: OrderProduct) {
  const response = await request.post(`${rootURL}/orderproduct`).send(order)
  if (!response) {
    throw new Error('Error creating order')
  } else {
    return response.body
  }
}
