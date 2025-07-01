import { OrderProduct } from '../../../models/ridiculuxe.ts'
import db from '../connection.ts'

interface NewOrder {
  user_id: number
  name: string
  email: string
  address1: string
  address2?: string
  address3?: string
}

export async function getOrder(id: string) {
  return await db('order').where('user_id', id).select('*')
}

export async function createOrder(order: NewOrder) {
  const id = await db('order')
    .insert({
      user_id: order.user_id,
      name: order.name,
      email: order.email,
      address1: order.address1,
      address2: order.address2,
      address3: order.address3,
    })
    .returning('id')

  return id
}

export async function createOrderProduct(order: OrderProduct) {
  const formatted = {
    product_id: order.productId,
    order_id: order.orderId,
    quantity: order.quantity,
  }
  return await db('product_order').insert(formatted)
}
