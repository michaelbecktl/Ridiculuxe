import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import DarkMode from './DarkMode'
import { IfAuthenticated } from './Authenticated'

export default function Header() {
  return (
    <header className="header">
      <Link to="/">Ridiculuxe</Link>
      <Link to="/aboutus">About Us</Link>
      <Link to="/contact">Contact Us</Link>
      <IfAuthenticated>
        <Link to="/profile">Profile</Link>
      </IfAuthenticated>
      <LoginButton />
      <DarkMode />
    </header>
  )
}
