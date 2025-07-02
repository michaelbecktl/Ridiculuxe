/* eslint-disable react/no-unknown-property */
import { Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

function Section(props) {
  return (
    <section
      className={`flex h-screen w-screen flex-col justify-center p-10 ${props.right ? 'items-end' : 'items-start'}`}
      style={{ opacity: props.opacity }}
    >
      <div className="flex w-1/2 items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="rounded-lg bg-[#8cbccc] px-8 py-12">
            {props.children}
          </div>
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

  useFrame(() => {
    setFirstSectionOpacity(1 - scroll.range(0, 1 / 10))
    setSecondSectionOpacity(scroll.curve(1 / 5, 1 / 5))
    setThirdSectionOpacity(scroll.curve(2 / 5, 1 / 5))
    setForthSectionOpacity(scroll.curve(3 / 5, 1 / 5))
  })

  return (
    <Scroll html>
      <Section opacity={firstSectionOpacity}>
        <p>
          Experience next-generation immersion with our state-of-the-art VR
          glasses.
        </p>
      </Section>
      <Section right opacity={secondSectionOpacity}>
        <p>
          Redefining virtual reality with precision optics and advanced motion
          tracking.
        </p>
      </Section>
      <Section opacity={thirdSectionOpacity}>
        <p>
          Designed for clarity, comfort, and total immersion—VR glasses built
          for the future.
        </p>
      </Section>
      <Section right opacity={forthSectionOpacity}>
        <p>
          Step into a new dimension with premium VR glasses crafted for seamless
          performance.
        </p>
      </Section>
    </Scroll>
  )
}
