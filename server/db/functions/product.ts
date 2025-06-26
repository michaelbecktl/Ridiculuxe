import db from '../connection.ts'

export async function getProductById(name: string) {
  const product = await db('product').where('name', name).select().first()
  return product
}
