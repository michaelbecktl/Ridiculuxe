import { useScroll } from '@react-three/drei'
import Battery from './Battery'
import Cupcake from './Cupcake'
import HDD from './HDD'
import HDScreen from './HDScreen'
import Linkup from './Linkup'
import Mind from './Mind'
import { useState } from 'react'
import { useFrame } from '@react-three/fiber'

function FeatureBadges() {
  const [value, setValue] = useState(0)
  const scroll = useScroll()
  const [complete, setComplete] = useState(false)

  // useFrame(() => {
  //   if (scroll.offset * 3 - 0.2 < 1) setValue(scroll.offset * 3 - 0.2)
  // })
  let velocity = 0.1
  const damping = 0.09

  useFrame(() => {
    if (!complete && scroll.offset > 0.2)
      setValue((prev) => {
        velocity *= damping
        return (prev += velocity)
      })
    if (!complete && value >= 1) setComplete(true)
  })

  return (
    <div
      className={`mx-64 my-8 grid grid-cols-3 rounded-3xl border-4 border-solid border-current bg-[var(--secondary-bg)]`}
      style={{
        opacity: value,
        transform: `scale(${value}) translateY(${1000 - value * 1000}px)`,
      }}
    >
      <div className="mx-16 my-8 flex flex-col items-center space-y-2">
        <HDScreen />
        <p className="text-center text-sm">Always-On Retina display</p>
        <p className="text-center text-sm">Up to 2,000 nits</p>
      </div>
      <div className="mx-16 my-8 flex flex-col items-center space-y-2">
        <Battery />
        <p className="text-center text-sm">Up to 36 hours</p>
        <p className="text-center text-sm">Up to 72 hours in Low Power Mode</p>
        <p className="text-center text-sm">Fast charging</p>
      </div>
      <div className="mx-16 my-8 flex flex-col items-center space-y-2">
        <HDD />
        <p className="text-center text-sm">128GB storage</p>
        <p className="text-center text-sm">Easy cloud storage access members</p>
      </div>
      <div className="mx-16 my-8 flex flex-col items-center space-y-2">
        <Mind />
        <p className="text-center text-sm">Next-gen bio-security</p>
        <p className="text-center text-sm">Unlock with your thoughts</p>
      </div>
      <div className="mx-16 my-8 flex flex-col items-center space-y-2">
        <Linkup />
        <p className="text-center text-sm">Sync with other watches</p>
        <p className="text-center text-sm">Seamless data exchange</p>
      </div>
      <div className="mx-16 my-8 flex flex-col items-center space-y-2">
        <Cupcake />
        <p className="text-center text-sm">Possibly edible</p>
        <p className="text-center text-xs">Terms and Conditions apply</p>
      </div>
    </div>
  )
}

export default FeatureBadges
