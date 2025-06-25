import request from 'superagent'
import { ProductQuantity } from '../../models/product'

const rootURL = new URL(`/api/v1/product/`, document.baseURI)

export async function getProductById(id: number) {
  const response = await request.get(`${rootURL}/${id}`)
  if (!response) {
    throw new Error('Could not retrieve product')
  } else {
    return response.body
  }
}

export async function soldProduct(data: ProductQuantity) {
  const { id, quantity } = data
  const response = await request.patch(`${rootURL}/${id}`).send({ quantity })
  if (!response) {
    throw new Error('Error updating product')
  } else {
    return response.body
  }
}
