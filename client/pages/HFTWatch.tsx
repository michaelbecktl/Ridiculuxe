import { Canvas } from '@react-three/fiber'
import Displaywatch from '../3d-components/Displaywatch'
import { Scroll, ScrollControls } from '@react-three/drei'
import BlurText from '../components/HFTWatch/BlurText'
import Title from '../components/HFTWatch/Title'
import FeatureBadges from '../components/HFTWatch/FeatureBadges'
import { useState } from 'react'
import ColorPicker from '../components/HFTWatch/ColorPicker'
import { useNavigate } from 'react-router-dom'
import Holowatch from '../3d-components/Holowatch'
import AbstractCity from '../3d-components/AbstractCity'
import FeaturePopups from '../components/HFTWatch/FeaturePopups'

function HFTWatch() {
  const [frameColor, setFrameColor] = useState(0xffffff)
  const [bandColor, setBandColor] = useState(0xffffff)
  const [popUp, setPopUp] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [buyNow, setBuyNow] = useState('opacity-0')
  const navigate = useNavigate()
  const handleClick = () => navigate('/shop/LuxTech Watch')

  return (
    <>
      <div className="hftwatch h-[84vh] w-screen">
        <Canvas
          gl={{ alpha: true }}
          style={{
            background: 'transparent',
            position: 'absolute',
            top: '16vh',
            height: '84vh',
          }}
        >
          <ScrollControls pages={3.5} damping={0.08}>
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Scroll>
              <Displaywatch
                url="/3dmodels/smartwatch.fbx"
                bandColor={bandColor}
                frameColor={frameColor}
                loaded={loaded}
                setLoaded={setLoaded}
              />
              <Holowatch
                url="/3dmodels/smartwatch.fbx"
                bandColor={bandColor}
                frameColor={frameColor}
                setPopUp={setPopUp}
                popUp={popUp}
              />
              <AbstractCity url="/3dmodels/LowpolyCity.fbx" loaded={loaded} />
            </Scroll>
            <Scroll html>
              <div className="flex h-screen w-screen">
                <div className="w-1/2"></div>
                <div className="w-1/2 ">
                  <div
                    className={`mt-20 w-[70%] bg-[var(--bg-color)] p-4 opacity-95 shadow-md shadow-[var(--bg-color)]`}
                  >
                    <span>
                      <BlurText
                        text="Hear Feel Think"
                        delay={1000}
                        animateBy="words"
                        direction="left"
                        className="text-6xl"
                      />
                    </span>
                    <Title loaded={loaded} />
                    <ColorPicker
                      setFrameColor={setFrameColor}
                      setBandColor={setBandColor}
                      frameColor={frameColor}
                      bandColor={bandColor}
                      loaded={loaded}
                      buyNow={buyNow}
                      setBuyNow={setBuyNow}
                    />
                    <button
                      onClick={handleClick}
                      className={`${buyNow} inset-shadow-xl inset-shadow-gray-500 ml-16 rounded-3xl bg-[#3227a7] px-5 text-xl text-neutral-50 shadow-md shadow-[var(--basic-shadow)] transition-all duration-300 hover:opacity-80 active:opacity-100`}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="top-100 h-screen w-screen justify-center">
                <FeatureBadges />
              </div>
              <div className="top-200 h-screen w-screen justify-center">
                <FeaturePopups popUp={popUp} />
                <div className="mx-64">
                  <button
                    onClick={handleClick}
                    className={`${buyNow} inset-shadow-xl inset-shadow-gray-500 ml-16 rounded-3xl bg-[#3227a7] px-5 text-xl text-neutral-50 shadow-md shadow-[var(--basic-shadow)] transition-all duration-300 hover:opacity-80 active:opacity-100`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </>
  )
}

export default HFTWatch
