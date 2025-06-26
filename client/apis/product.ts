import request from 'superagent'
import { ProductQuantity } from '../../models/ridiculuxe'

const rootURL = new URL(`/api/v1/product`, document.baseURI)

export async function getProductById(name: string) {
  const response = await request.get(`${rootURL}/${name}`)
  if (!response) {
    throw new Error('Could not retrieve product')
  } else {
    return response.body
  }
}

export async function soldProduct(data: ProductQuantity) {
  const { name, quantity } = data
  const response = await request.patch(`${rootURL}/${name}`).send({ quantity })
  if (!response) {
    throw new Error('Error updating product')
  } else {
    return response.body
  }
}
