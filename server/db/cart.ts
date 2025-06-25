import {
  AllCartData,
  CartData,
  DeleteCartItem,
} from '../../models/ridiculuxe.ts'
import db from './connection.ts'

export async function getCartByUser(id: string) {
  const cart = await db('cart')
    .where('user_id', id)
    .select('id', 'user_id as userId', 'product_id as productId', 'quantity')
  return cart
}

export async function addToCart(update: CartData) {
  const formatted = {
    user_id: update.userId,
    product_id: update.productId,
    quantity: update.quantity,
  }
  const existing = await db('cart')
    .where('user_id', formatted.user_id)
    .where('product_id', formatted.product_id)
    .select()
    .first()

  if (!existing) {
    const cart = await db('cart')
      .insert(formatted)
      .where('user_id', formatted.user_id)
    return cart
  }

  if (existing) {
    const { quantity } = existing
    const newQuantity = quantity + formatted.quantity

    const cart = await db('cart')
      .where('user_id', formatted.user_id)
      .where('product_id', formatted.product_id)
      .update('quantity', newQuantity)
    return cart
  }
}

export async function updateCart(update: AllCartData) {
  const { userId } = update
  const allUpdates = update.cart

  return allUpdates.forEach(async (update) => {
    await db('cart')
      .where('user_id', userId)
      .where('product_id', update.productId)
      .update('quantity', update.quantity)
  })
}

export async function deleteFromCart(update: DeleteCartItem) {
  const cart = await db('cart')
    .where('user_id', update.userId)
    .where('product_id', update.productId)
    .delete()
  return cart
}
