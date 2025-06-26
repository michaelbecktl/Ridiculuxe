import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router'

const newUserData = {
  name: '',
  email: '',
  address1: '',
  address2: '',
  address3: '',
}

export default function CreateUser() {
  const [newUser, setNewUser] = useState(newUserData)
  const { getAccessTokenSilently } = useAuth0()
  const user = useUser()
  const navigate = useNavigate()

  const {
    name: newName,
    email: newEmail,
    address1: newAddress1,
    address2: newAddress2,
    address3: newAddress3,
  } = newUser

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evt.target
    setNewUser({
      ...newUser,
      [id]: value,
    })
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()
    user.add.mutate({ newUser, token })
    navigate('/')
  }

  return (
    <div className="create user form div">
      <form onSubmit={handleSubmit} className="create user form">
        <label htmlFor="name" className="create_user_form_header">
          Name:{' '}
        </label>
        <input
          type="text"
          id="name"
          value={newName}
          onChange={handleChange}
          className="create user form text"
        />
        <label htmlFor="email" className="create_user_form_header">
          Email:{' '}
        </label>
        <input
          type="text"
          id="email"
          value={newEmail}
          onChange={handleChange}
          className="create user form text"
        />
        <label htmlFor="address1" className="create_user_form_header">
          Street Address:{' '}
        </label>
        <input
          type="text"
          id="address1"
          value={newAddress1}
          onChange={handleChange}
          className="create user form text"
        />
        <label htmlFor="address2" className="create_user_form_header">
          Town/City:{' '}
        </label>
        <input
          type="text"
          id="address2"
          value={newAddress2}
          onChange={handleChange}
          className="create user form text"
        />
        <label htmlFor="address3" className="create_user_form_header">
          Postal code:{' '}
        </label>
        <input
          type="text"
          id="address3"
          value={newAddress3}
          onChange={handleChange}
          className="create user form text"
        />
        <br />
        <button type="submit">Submit New User</button>
        <br />
      </form>
    </div>
  )
}
