import { Canvas } from '@react-three/fiber'
import Displaywatch from '../3d-components/Displaywatch'
import { Scroll, ScrollControls } from '@react-three/drei'
import BlurText from '../components/HFTWatch/BlurText'
import Title from '../components/HFTWatch/Title'
import FeatureBadges from '../components/HFTWatch/FeatureBadges'
import { useState } from 'react'
import ColorPicker from '../components/HFTWatch/ColorPicker'
import BuyWatch from '../components/HFTWatch/BuyWatch'
import { useNavigate } from 'react-router-dom'

function HFTWatch() {
  const [frameColor, setFrameColor] = useState(0xffffff)
  const [bandColor, setBandColor] = useState(0xffffff)
  const navigate = useNavigate()

  const handleClick = () => navigate('/shop/LuxTech Watch')
  return (
    <>
      <div className="h-screen w-screen">
        <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
          <ScrollControls pages={3} damping={0.08}>
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Scroll>
              <Displaywatch
                url="/3dmodels/smartwatch.fbx"
                bandColor={bandColor}
                frameColor={frameColor}
              />
            </Scroll>
            <Scroll html>
              <div className="flex h-screen w-screen">
                <div className="w-1/2"></div>
                <div className="w-1/2">
                  {' '}
                  <span>
                    <BlurText
                      text="Hear Feel Think"
                      delay={1000}
                      animateBy="words"
                      direction="left"
                      className="mt-32 text-6xl"
                    />
                  </span>
                  <Title />
                  <ColorPicker
                    setFrameColor={setFrameColor}
                    setBandColor={setBandColor}
                    frameColor={frameColor}
                    bandColor={bandColor}
                  />
                  <button
                    onClick={handleClick}
                    className="inset-shadow-xl inset-shadow-gray-500 rounded-3xl bg-[#3227a7] px-5 py-3 text-xl text-neutral-50 opacity-90 shadow-md shadow-[var(--basic-shadow)] hover:opacity-80 active:opacity-100"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
              <div className="top-100 h-screen w-screen justify-center">
                <FeatureBadges />
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </>
  )
}

export default HFTWatch
