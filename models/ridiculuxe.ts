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
