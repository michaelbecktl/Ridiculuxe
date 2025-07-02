import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

function FeaturePopups({ popUp }) {
  const [show, setShow] = useState({
    one: 'opacity-0',
    two: 'opacity-0',
  })
  const [value, setValue] = useState({
    one: '0',
    two: '0',
  })
  const [timer, setTimer] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useFrame((state) => {
    const currentTime = state.clock.getElapsedTime()

    if (!timer && popUp) {
      setElapsedTime(state.clock.getElapsedTime())
      setTimer(true)
    }

    if (popUp && show.one === 'opacity-0') {
      setShow({ ...show, one: 'opacity-100' })
      setValue({ ...value, one: '1' })
    }
    if (timer && currentTime - elapsedTime > 0.2 && show.two === 'opacity-0') {
      setShow({ ...show, two: 'opacity-100' })
      setValue({ ...value, two: '1' })
    }
  })

  return (
    <div className="mx-64 my-16 grid grid-cols-2">
      <div
        className={`${show.one} relative mx-8 w-[80%] rounded-3xl bg-[var(--secondary-bg)] shadow-xl shadow-[var(--basic-shadow)] transition-all duration-1000`}
        style={{
          transform: `scale(${value.one}) translateX(${1000 - Number(value.one) * 1000}px)`,
        }}
      >
        <img
          src="/image/watch1.png"
          alt="Waterproof Features"
          className="rounded-3xl"
        />
        <p className="absolute bottom-8 left-8 text-5xl font-bold text-[white]">
          Durable and Waterproof
        </p>
      </div>
      <div
        className={`${show.two} relative mx-8 w-[80%] rounded-3xl bg-[var(--secondary-bg)] shadow-xl shadow-[var(--basic-shadow)] transition-all duration-1000`}
        style={{
          transform: `scale(${value.two}) translateX(${-1000 + Number(value.two) * 1000}px)`,
        }}
      >
        <img
          src="/image/watch2.png"
          alt="Waterproof Features"
          className="rounded-3xl"
        />
        <p className="absolute bottom-8 left-8 text-5xl font-bold text-[white]">
          Premium Package, Fast Shipping
        </p>
      </div>
    </div>
  )
}

export default FeaturePopups
