import connection from '../connection.ts'
import { UserData } from '../../../models/ridiculuxe.ts'

const db = connection

export async function createUserProfile(user: UserData) {
  await db('user').insert({
    auth0_id: user.auth0Id,
    name: user.name,
    email: user.email,
    address1: user.address1,
    address2: user.address2,
    address3: user.address3,
  })
}

export async function getUserProfile(id: number) {
  const result = await db('user')
    .select('name', 'email', 'address1', 'address2', 'address3')
    .where('id', id)
    .first()
  return result
}

export async function getUserProfileByAuth(id: string) {
  const result = await db('user')
    .select('name', 'email', 'address1', 'address2', 'address3', 'id')
    .where('auth0_id', id)
    .first()
  return result
}
