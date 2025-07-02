import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/ridiculuxe'
import { getUser } from '../apis/users'

export default function Profile() {
  const { getAccessTokenSilently } = useAuth0()
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getAccessTokenSilently()
        const data = await getUser({ token })
        setUserData(data)
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError('Failed to load profile data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [getAccessTokenSilently])

  if (isLoading) {
    return (
      <div className="text-lg font-medium leading-6 text-gray-900">
        <div className="loading">Loading profile...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-lg font-medium leading-6 text-gray-900">
        <div className="error">{error}</div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="text-lg font-medium leading-6 text-gray-900">
        <div className="not-found">No profile data found</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-800 p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-gray-800 bg-zinc-400 text-center">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-semibold text-gray-800 sm:text-3xl">
            User Profile
          </h3>
        </div>
        <div className="border-t border-gray-950 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-950">
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-600">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userData.name}
              </dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-600">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userData.email}
              </dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-600">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="address-lines">
                  <div>{userData.address1}</div>
                  {userData.address2 && <div>{userData.address2}</div>}
                  {userData.address3 && <div>{userData.address3}</div>}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
