export interface CartData {
  user_id: string
  product_id: string
  quantity: number
}

export interface Cart extends CartData {
  id: number
}

export interface OrderData {
  auth0_id: string
  name: string
  email: string
  address1: string
  address2: string
  address3: string
}

export interface Order extends OrderData {
  id: number
}

export interface ProductData {
  name: string
  description: string
  price: number
  image: string
  stock: number
}

export interface Product extends ProductData {
  id: number
}

export interface UserData {
  auth0_id: string
  name: string
  email: string
  address1: string
  address2: string
  address3: string
}

export interface User extends UserData {
  id: number
}

export interface newUser {
  name: string
  email: string
  address1: string
  address2: string
  address3: string
}
