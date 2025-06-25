import request from 'superagent'
import { logError } from './utils'
import { newUser, User } from '../../models/ridiculuxe'
const rootURL = new URL(`/api/v1`, document.baseURI)

interface GetUserFunction {
  token: string
}
export async function getUser({
  token,
}: GetUserFunction): Promise<User | null> {
  return await request
    .get(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.username ? res.body.username : null))
    .catch(logError)
}

interface AddUserFunction {
  newUser: newUser
  token: string
}
export async function addUser({
  newUser,
  token,
}: AddUserFunction): Promise<User> {
  return request
    .post(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body.user)
    .catch(logError)
}
