import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scroll, ScrollControls, OrbitControls, useGLTF } from '@react-three/drei'

import Title from '../components/RoBot/ Tiltle'
import '../styles/BluviaBot.css'

function Robot() {
  const { scene } = useGLTF('/Robot/bluebot.glb')
  return <primitive object={scene} scale={2.5} position={[0, 0, 0]} />
}

function BluviaBot() {
  return (
    <div className="robot-wrapper">
  
      <div className="background-layer" />
      <div className="glitter-layer" />

      {/* Canvas & HTML content */}
      <div className="robot-canvas-container">
        <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
          <ambientLight intensity={2.0} />
          <directionalLight position={[50, 50, 50]} />
          <Suspense fallback={null}>
            <ScrollControls pages={3} damping={0.1}>
              <Scroll>
                <Robot />
              </Scroll>
              <Scroll html>
                <Title />
              </Scroll>
            </ScrollControls>
          </Suspense>
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
    </div>
  )
}

export default BluviaBot