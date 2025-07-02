/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, PerspectiveCamera } from '@react-three/drei'
import { useRef, useState } from 'react'
import Glasses from '../3d-components/Glasses'
import { OverlayText } from '../3d-components/OverlayText'
import * as THREE from 'three'
import NatureViewer from '../3d-components/NatureViewer'

function ScrollZoomCamera({ fadeOpacity }: { fadeOpacity: number }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const scroll = useScroll()

  useFrame(() => {
    if (!cameraRef.current) return

    // ✅ Stop scroll-based movement when NatureViewer is fully visible
    if (fadeOpacity <= 0.01) return

    const scrollOffset = scroll.offset
    const startPos = new THREE.Vector3(0, 0, 8)
    const endPos = new THREE.Vector3(0, 0, 0.2)
    const lerpedPos = startPos.clone().lerp(endPos, scrollOffset)

    cameraRef.current.position.lerp(lerpedPos, 0.1)
    cameraRef.current.lookAt(0, 0, 0)
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 8]}
      fov={50}
    />
  )
}

export default function LuxeVision() {
  const [fadeOpacity, setFadeOpacity] = useState(1)

  return (
    <div className="h-screen w-screen">
      <Canvas>
        <directionalLight intensity={1} />
        <ScrollControls pages={5} damping={0.1}>
          <ScrollZoomCamera fadeOpacity={fadeOpacity} />
          <OverlayText />
          <Glasses setFadeOpacity={setFadeOpacity} />
        </ScrollControls>
        <NatureViewer opacity={1 - fadeOpacity} />
      </Canvas>
    </div>
  )
}
