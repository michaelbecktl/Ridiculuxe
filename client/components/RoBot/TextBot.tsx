import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TextbotProps {
  text: string
  delay?: number
  className?: string
}

function Textbot({ text, delay = 0, className = '' }: TextbotProps) {
  const [showIndex, setShowIndex] = useState(-1)

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setShowIndex(i)
        i++
        if (i >= text.length) clearInterval(interval)
      }, 120)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay, text.length])

  const characters = text.split('')

  return (
    <div className={`flex gap-1 ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={showIndex >= index ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0,
            duration: 0.4,
            ease: 'easeOut',
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

export default Textbot