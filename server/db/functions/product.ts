import { Product } from '../../../models/ridiculuxe.ts'
import db from '../connection.ts'

export async function getProductByName(name: string): Promise<Product> {
  const product = await db('product').where('name', name).select().first()
  return product
}

export async function getProductById(id: string): Promise<Product> {
  const product = await db('product').where('id', id).select().first()
  return product
}

export async function soldProduct(id: string, quantity: number) {
  const { stock } = await db('product').where('id', id).select().first()

  const newStock = stock - quantity

  const product = await db('product')
    .where('id', id)
    .update('stock', newStock)
    .returning('*')

  return product
}
