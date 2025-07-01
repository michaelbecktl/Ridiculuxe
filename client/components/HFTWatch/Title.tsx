import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

function Title() {
  const [show, setShow] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useFrame((state) => {
    const timeElapsed = state.clock.getElapsedTime()

    if (timeElapsed > 3 && !show && opacity < 100) {
      setShow(true)
      setOpacity((prev) => (prev += 1))
    }
  })

  return (
    <>
      <h1
        className={`mt-16 text-8xl transition-all duration-500 opacity-${opacity}`}
      >
        LuxTech Watch
      </h1>
      <p className={`text-xl transition-all duration-500 opacity-${opacity}`}>
        The watch for all your needs
      </p>
    </>
  )
}

export default Title
