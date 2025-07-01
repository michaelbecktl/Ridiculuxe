
import { motion } from 'framer-motion'
import Textbot from './TextBot'

function Title() {
  return (
    <div className="title-container w-full h-screen px-16 pt-16 flex flex-col items-start bg-white dark:bg-black">
      {/* BotBluvia letter-by-letter */}
      <Textbot
        text="BotBluvia"
        delay={300}
        className="text-[5rem] font-extrabold tracking-[0.35em] uppercase tech-title"
      />

      {/* Tagline with smooth fade-in */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="text-xl mt-10 max-w-md px-1"
      >
        Your Everyday Luxe Assistant – just say it, and BotBluvia does it.
      </motion.p>
    </div>
  )
}

export default Title