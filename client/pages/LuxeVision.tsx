/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { ScrollControls, OrbitControls } from '@react-three/drei'
import Glasses from '../3d-components/Glasses'
import { OverlayText } from '../3d-components/OverlayText'

export default function LuxeVision() {
  return (
    <>
      <div className="h-screen w-screen">
        <Canvas>
          <directionalLight intensity={1} />
          <OrbitControls enableZoom={false} />
          <ScrollControls pages={5} damping={0.1}>
            <OverlayText />
            <Glasses />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  )
}
