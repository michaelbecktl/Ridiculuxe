import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

function Title() {
  const [show, setShow] = useState(false)
  const [opacity, setOpacity] = useState('opacity-0')

  useFrame((state) => {
    const timeElapsed = state.clock.getElapsedTime()

    if (timeElapsed > 3.5 && !show) {
      setShow(true)
      setOpacity('opacity-100')
    }
  })

  return (
    <>
      <h1 className={`mt-16 text-8xl transition-all duration-500 ${opacity}`}>
        LuxTech Watch
      </h1>
      <p className={`text-xl transition-all duration-500 ${opacity}`}>
        The watch for all your needs
      </p>
    </>
  )
}

export default Title
