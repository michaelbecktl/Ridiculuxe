import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { useAuth0 } from '@auth0/auth0-react'

export default function LoginButton() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}/register`,
      },
    })
  }

  return (
    <div>
      <IfAuthenticated>
        <div className="flex flex-col items-center justify-center">
          <button onClick={handleSignOut}>Sign out</button>
          {user && <p>Signed in as: {user?.nickname}</p>}
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button onClick={handleSignIn}>Sign in</button>
      </IfNotAuthenticated>
    </div>
  )
}
