
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scroll, ScrollControls, OrbitControls, useGLTF } from '@react-three/drei'

import Title from '../components/RoBot/ Tiltle'


function Robot() {
  const { scene } = useGLTF('/Robot/bluebot.glb')
  return <primitive object={scene} scale={2.5} position={[0, 0, 0]} />
}

function BluviaBot() {

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
        {/* Static 3D Elements */}
        <ambientLight intensity={2.0} />
        <directionalLight position={[50, 50, 50]} />
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.1}>
            {/* Scroll-linked 3D content */}
            <Scroll>
              <Robot />
            </Scroll>

            {/* Scroll-linked HTML content */}
            <Scroll html>
           
            <Title />
            </Scroll>
          </ScrollControls>
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  )
}

export default BluviaBot
