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
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error">{error}</div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <div className="not-found">No profile data found</div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-details">
        {userData.name && (
          <div className="detail">
            <span className="label">Name:</span>
            <span className="value">{userData.name}</span>
          </div>
        )}
        {userData.email && (
          <div className="detail">
            <span className="label">Email:</span>
            <span className="value">{userData.email}</span>
          </div>
        )}
        {userData.address1 && (
          <div className="detail">
            <span className="label">Address:</span>
            <div className="address-lines">
              <div>{userData.address1}</div>
              {userData.address2 && <div>{userData.address2}</div>}
              {userData.address3 && <div>{userData.address3}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
