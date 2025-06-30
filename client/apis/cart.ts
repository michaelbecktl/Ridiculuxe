import request from 'superagent'
import { AllCartData, CartData, DeleteCartItem } from '../../models/ridiculuxe'

const rootURL = new URL(`/api/v1/cart`, document.baseURI)

export async function getCartByUser(id: string) {
  const response = await request.get(`${rootURL}/${id}`)
  if (!response) {
    throw new Error('Could not retrieve shopping cart')
  } else {
    return response.body
  }
}

export async function addToCart(update: CartData) {
  const { userId, productId, quantity } = update
  const response = await request
    .post(`${rootURL}/${userId}`)
    .send({ productId, quantity })
  if (!response) {
    throw new Error('Could not add product to shopping cart')
  } else {
    return response.body
  }
}

export async function updateCart(update: AllCartData) {
  const { userId, cart } = update
  const response = await request.patch(`${rootURL}/${userId}`).send({ cart })
  if (!response) {
    throw new Error('Could not update shopping cart')
  } else {
    return response.body
  }
}

export async function deleteFromCart(update: DeleteCartItem) {
  const { userId, productId } = update
  const response = await request
    .delete(`${rootURL}/remove/${userId}`)
    .send({ productId })
  if (!response) {
    throw new Error('Could not delete product from shopping cart')
  } else {
    return response.body
  }
}

interface DeleteCart {
  userId: string
}

export async function deleteCart(update: DeleteCart) {
  const { userId } = update
  const response = await request.delete(`${rootURL}/destroy/${userId}`)
  if (!response) {
    throw new Error('Could not delete product from shopping cart')
  } else {
    return response.body
  }
}
