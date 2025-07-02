import { motion } from 'framer-motion'
import Textbot from './TextBot'



function Title() {
 
  return (
    <div className="title-container flex h-screen w-full flex-col items-start px-16 pt-16">
      {/* BotBluvia letter-by-letter */}
      <Textbot
        text="BotBluvia"
        delay={300}
        className="tech-title text-[4rem] font-extrabold uppercase tracking-[0.35em]"
      />

      {/* Tagline with smooth fade-in */}
      <motion.p
        initial={{ opacity: 0, y: 10, x: 100 }}
        animate={{ opacity: 1, y: 350, x: 850 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
        className="mt-16 max-w-md px-6 text-xl"
      >
        Meet BotBluvia Your Luxe Everyday Assistant just say it and BotBluvia
        does it.
      </motion.p>

      <motion.p
  initial={{ opacity: 0, y: '100vh', x: 0 }}      
  animate={{ opacity: 1, y: 700, x: 0 }}             
  transition={{ delay: 2.0, duration: 1.5, ease: 'easeOut' }}
  className="robot-text-bubble"
>
  Isn’t just a robot,  it’s your personal lifestyle companion with a touch of luxury and high-tech AI, handling your daily tasks.
  <br /><br />
  <strong>What BotBluvia Can Do</strong><br />
  • Finds your charger before your soul leaves your body <br />
  • Brings snacks, no judgment <br />
  • Turns off lights like a lazy legend <br />
  • Joins meetings for you and leaves your camera “accidentally” off <br />
  • Reminds you of things your brain refuses to <br />
  • Pretends to listen (better than most humans) <br />
  • Responds “lol” to texts you’re too tired to deal with <br />
  • Makes your bed (while you’re still in it) <br />
  • Replaces your toilet paper roll without starting a war <br />
  • Brings the cereal and the spoon (no questions asked)<br />
  • Cooks simple stuff (not Gordon Ramsay, but better than you)
</motion.p>


    
    </div>
    
  )
}

export default Title
