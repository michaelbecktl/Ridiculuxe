import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TextbotProps {
  text: string
  delay?: number
  className?: string
  stacked?: boolean 
}

function Textbot({ text, delay = 0, className = '', stacked = false }: TextbotProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  const characters = stacked ? text.split('') : [text]

  return (
    <div className={`flex ${stacked ? 'flex-col items-start' : ''} ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: delay / 1000 + index * 0.1,
            duration: 0.4,
            ease: 'easeOut',
          }}
          className="text-6xl leading-none"
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

export default Textbot