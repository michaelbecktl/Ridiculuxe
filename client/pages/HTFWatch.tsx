import { Canvas } from '@react-three/fiber'
import Displaywatch from '../3d-components/Displaywatch'
import { Scroll, ScrollControls } from '@react-three/drei'
import BlurText from '../components/HFTWatch/BlurText'
import Title from '../components/HFTWatch/Title'

function HFTWatch() {
  return (
    <>
      <div className="h-screen w-screen">
        <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
            <Scroll>
              <Displaywatch url="/3dmodels/smartwatch.fbx" />
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
