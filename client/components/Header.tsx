import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoginButton from './LoginButton'
import DarkMode from './DarkMode'
import { IfAuthenticated } from './Authenticated'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CartLink from './CartLink'

const ANIMATION_ROUTES = ['/']

export default function Header() {
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = ANIMATION_ROUTES.includes(location.pathname)

  const scrollToProduct = (index: number) => {
    if (location.pathname !== '/') {
      navigate('/')
    }
    const element = document.getElementById(`product-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setScrollY(window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname, isHomePage])

  const maxScroll = 200
  const progress = isHomePage ? Math.min(scrollY / maxScroll, 1) : 0
  const easeProgress = Math.pow(progress, 2)

  return (
    <header className="header">
      <div className="flex h-[7vh] w-dvw flex-row items-center justify-center pl-10 pr-10 pt-5">
        <div className="darkmode-position w-1/2">
          <DarkMode />
        </div>
        <div className="rubik-logo absolute">
          <motion.div
            initial={{
              opacity: 0,
              scale: isHomePage ? 2 : 1,
              y: isHomePage ? window.innerHeight / 2 : 0,
            }}
            animate={{
              opacity: 1,
              scale: isHomePage
                ? easeProgress === 1
                  ? 1
                  : 2 - easeProgress
                : 1,
              y: isHomePage
                ? easeProgress === 1
                  ? 0
                  : (window.innerHeight / 2) * (1 - easeProgress)
                : 0,
            }}
            transition={{
              duration: 0.1,
              ease: 'easeInOut',
            }}
            className={`text-[48px] ${scrollY > 0 ? 'opacity-50' : 'opacity-100'}`}
          >
            <Link to="/">Ridiculuxe</Link>
          </motion.div>
        </div>
        <div className="flex w-1/2 justify-end">
          <CartLink />
          <LoginButton />
        </div>
      </div>
      <div className="navbar flex -translate-x-10 flex-row">
        <div>
          <button onClick={() => scrollToProduct(0)}>LuxTech Watch</button>
          <button onClick={() => scrollToProduct(1)}>Nanobot</button>
          <button onClick={() => scrollToProduct(2)}>BluviaBot</button>
          <button onClick={() => scrollToProduct(3)}>LuxeVision</button>
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
