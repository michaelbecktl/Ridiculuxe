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

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setNewUser({
      ...newUser,
      [name]: value,
    })
  }

  const handleSubmit = async (evt) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()
    user.add.mutate({ newUser, token })
    navigate('/')
  }

  return (
    <div className="bg-zinc-800 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-zinc-400 w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-700">
            Register for a free account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <input
                name="name"
                type="text"
                required
                className="bg-zinc-500 relative block w-full appearance-none rounded-md border border-gray-700 px-3 py-3 text-zinc-800 placeholder-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your name"
                value={newName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                required
                className="bg-zinc-500 relative block w-full appearance-none rounded-md border border-gray-700 px-3 py-3 text-zinc-800 placeholder-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                value={newEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="address1"
                type="text"
                required
                className="bg-zinc-500 relative block w-full appearance-none rounded-md border border-gray-700 px-3 py-3 text-zinc-800 placeholder-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your street address"
                value={newAddress1}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <input
                  name="address2"
                  type="text"
                  required
                  className="bg-zinc-500 relative block w-full appearance-none rounded-md border border-gray-700 px-3 py-3 text-zinc-800 placeholder-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Town/City"
                  value={newAddress2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="address3"
                  type="text"
                  required
                  className="bg-zinc-500 relative block w-full appearance-none rounded-md border border-gray-700 px-3 py-3 text-zinc-800 placeholder-zinc-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Postal code"
                  value={newAddress3}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 group relative flex w-full justify-center rounded-md border border-transparent px-4 py-3 text-sm font-medium text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
