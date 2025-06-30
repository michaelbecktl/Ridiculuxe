import db from './connection.ts'

interface NewOrder {
  user_id: number
  name: string
  email: string
  address1: string
  address2?: string
  address3?: string
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
