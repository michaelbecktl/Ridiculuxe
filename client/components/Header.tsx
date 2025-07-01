import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import DarkMode from './DarkMode'
import { IfAuthenticated } from './Authenticated'

export default function Header() {
  return (
    <header className="header">
      <div className="flex w-dvw flex-row items-center justify-center pb-5 pl-10 pr-10 pt-5">
        <div className="w-1/2">
          <DarkMode />
        </div>
        <Link to="/">Ridiculuxe</Link>
        <div className="flex w-1/2 justify-end">
          <LoginButton />
        </div>
      </div>
      <div className="navbar flex w-dvw flex-row justify-evenly">
        <div>
          <span>Glasses</span>
          <span>Watch</span>
          <span>Robot</span>
          <span>Nano Robot</span>
        </div>
        <div>
          <Link to="/aboutus">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <IfAuthenticated>
            <Link to="/profile">Profile</Link>
          </IfAuthenticated>
        </div>
      </div>
    </header>
  )
}
