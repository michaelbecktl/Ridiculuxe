/* eslint-disable react/no-unknown-property */
import { Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Section(props) {
  return (
    <section
      className={`flex h-screen w-screen flex-col justify-center p-10 ${props.right ? 'items-end' : 'items-start'}`}
      style={{ opacity: props.opacity }}
    >
      <div className="flex w-1/2 items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-[28px]">{props.children}</div>
        </div>
      </div>
    </section>
  )
}

export function OverlayText() {
  const scroll = useScroll()
  const [firstSectionOpacity, setFirstSectionOpacity] = useState(1)
  const [secondSectionOpacity, setSecondSectionOpacity] = useState(1)
  const [thirdSectionOpacity, setThirdSectionOpacity] = useState(1)
  const [forthSectionOpacity, setForthSectionOpacity] = useState(1)

  const navigate = useNavigate()
  const handleClick = () => navigate('/shop/LuxeVision')

  useFrame(() => {
    setFirstSectionOpacity(1 - scroll.range(0, 1 / 10))
    setSecondSectionOpacity(scroll.curve(1 / 5, 1 / 5))
    setThirdSectionOpacity(scroll.curve(2 / 5, 1 / 5))
    setForthSectionOpacity(scroll.curve(3 / 5, 1 / 5))
  })

  return (
    <Scroll html>
      <h1 className="luxevision-adjustment-name absolute left-[400px] top-[250px] text-[64px]">
        LuxeVision
      </h1>
      <button
        onClick={handleClick}
        className="luxevision-adjustment-button absolute left-[300px] top-[350px]"
      >
        Buy Now
      </button>

      <Section opacity={firstSectionOpacity}>
        <h1>
          Experience next-generation immersion with our state-of-the-art VR
          glasses.
        </h1>
      </Section>
      <Section right opacity={secondSectionOpacity}>
        <h1>
          Redefining virtual reality with precision optics and advanced motion
          tracking.
        </h1>
      </Section>
      <Section opacity={thirdSectionOpacity}>
        <h1>
          Designed for clarity, comfort, and total immersion—VR glasses built
          for the future.
        </h1>
      </Section>
      <Section right opacity={forthSectionOpacity}>
        <h1>
          Step into a new dimension with premium VR glasses crafted for seamless
          performance.
        </h1>
      </Section>
    </Scroll>
  )
}
