import request from 'superagent'
import {
  CartData,
  Order,
  Product,
  ProductQuantity,
} from '../../models/ridiculuxe'

const rootURL = new URL(`/api/v1/product`, document.baseURI)

export async function getAllProducts(): Promise<Product[]> {
  const response = await request.get(`${rootURL}`)
  if (!response) {
    throw new Error('Could not retrieve product')
  } else {
    return response.body
  }
}

export async function getProductByName(name: string): Promise<Product> {
  const response = await request.get(`${rootURL}/name/${name}`)
  if (!response) {
    throw new Error('Could not retrieve product')
  } else {
    return response.body
  }
}

export async function getProductById(id: string): Promise<Product> {
  const response = await request.get(`${rootURL}/id/${id}`)
  if (!response) {
    throw new Error('Could not retrieve product')
  } else {
    return response.body
  }
}

export async function soldProduct(data: ProductQuantity) {
  const { productId, quantity } = data
  const response = await request
    .patch(`${rootURL}/stock/${productId}`)
    .send({ quantity })
  if (!response) {
    throw new Error('Error updating product')
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
  const response = await request.post('/api/v1/checkout').send(formatted)
  if (!response) {
    throw new Error('Error creating order')
  } else {
    return response.body
  }
}
