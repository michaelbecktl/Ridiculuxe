import { Canvas } from '@react-three/fiber'
import Displaywatch from '../3d-components/Displaywatch'
import { Scroll, ScrollControls } from '@react-three/drei'
import BlurText from '../components/HFTWatch/BlurText'
import Title from '../components/HFTWatch/Title'
import HDScreen from '../components/HFTWatch/HDScreen'
import Battery from '../components/HFTWatch/Battery'
import HDD from '../components/HFTWatch/HDD'
import Mind from '../components/HFTWatch/Mind'
import Cupcake from '../components/HFTWatch/Cupcake'

function HFTWatch() {
  return (
    <>
      <div className="h-screen w-screen">
        <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
          <directionalLight position={[5, 5, 5]} />
          <ScrollControls pages={3} damping={0.1}>
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
              <div className="top-100 h-screen w-screen justify-center">
                <div className="mx-64 my-32 grid grid-cols-3 rounded-3xl border-4 border-solid border-current">
                  <div className="mx-16 my-8 flex flex-col items-center space-y-2">
                    <HDScreen />
                    <p className="text-center text-sm">
                      Always-On Retina display
                    </p>
                    <p className="text-center text-sm">Up to 2,000 nits</p>
                  </div>
                  <div className="mx-16 my-8 flex flex-col items-center space-y-2">
                    <Battery />
                    <p className="text-center text-sm">Up to 36 hours</p>
                    <p className="text-center text-sm">
                      Up to 72 hours in Low Power Mode
                    </p>
                    <p className="text-center text-sm">Fast charging</p>
                  </div>
                  <div className="mx-16 my-8 flex flex-col items-center space-y-2">
                    <HDD />
                    <p className="text-center text-sm">128GB storage</p>
                    <p className="text-center text-sm">
                      Easy cloud storage access members
                    </p>
                  </div>
                  <div className="mx-16 my-8 flex flex-col items-center space-y-2">
                    <Mind />
                    <p className="text-center text-sm">Next-gen bio-security</p>
                    <p className="text-center text-sm">
                      Unlock with your thoughts
                    </p>
                  </div>
                  <div className="mx-16 my-8 flex flex-col items-center space-y-2">
                    <HDScreen />
                    <p className="text-center text-sm">Space</p>
                    <p className="text-center text-sm">Up to 2,000 nits</p>
                  </div>
                  <div className="mx-16 my-8 flex flex-col items-center space-y-2">
                    <Cupcake />
                    <p className="text-center text-sm">Possibly edible</p>
                    <p className="text-center text-xs">
                      Terms and Conditions apply
                    </p>
                  </div>
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
