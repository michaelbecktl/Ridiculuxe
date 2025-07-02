import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function BuyRobot() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 800 }}
      animate={{ opacity: 1, y: 740 }}
      transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
      className="mt-12 px-6"
    >
      <Link to="/product/BluviaBot">
      <button onClick={handleClick}>Buy Now</button>
      </Link>
    </motion.div>
  )
}

export default BuyRobot