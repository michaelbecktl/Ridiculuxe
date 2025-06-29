import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'

export default function Header() {
  return (
    <header className="header">
      <h1>Ridiculuxe</h1>
      <Link to="/aboutus">About Us</Link>
      <Link to="/contact">Contact Us</Link>
      <LoginButton />
    </header>
  )
}
