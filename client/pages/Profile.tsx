import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'

export default function Profile() {
  return (
    <div>
      <IfAuthenticated>
        <div className="p-8 text-center">
          <p>This page will display my profile.</p>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="p-8 text-center">
          <p>Please come back after you are logged in.</p>
        </div>
      </IfNotAuthenticated>
    </div>
  )
}
