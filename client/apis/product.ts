import request from 'superagent'
import { Product, ProductQuantity } from '../../models/ridiculuxe'

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
