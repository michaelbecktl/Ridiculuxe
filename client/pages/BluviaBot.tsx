import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scroll, ScrollControls, OrbitControls, useGLTF } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'

import Title from '../components/RoBot/ Tiltle'
import '../styles/BluviaBot.css'

function Robot() {
  const { scene } = useGLTF('/Robot/bluebot.glb')
  return <primitive object={scene} scale={2.5} position={[0,-0.5, 0]} />
}

function BluviaBot() {
  const navigate = useNavigate()
  const handleClick = () => navigate('/shop/BluviaBot')
  return (
    <div className="robot-wrapper">
  
      <div className="background-layer" />
      <div className="glitter-layer" />

      {/* Canvas & HTML content */}
      <div className="robot-canvas-container">
        <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
          <ambientLight intensity={2.0} />
          <directionalLight position={[10, 50, 5]} />
          <Suspense fallback={null}>
            <ScrollControls pages={2} damping={0.5}>
              <Scroll>
                <Robot />
              </Scroll>
              <Scroll html>
  {/* Your Buy Now Button */}
  <button
    onClick={handleClick}
    className="buy-now-button ml-16 rounded-3xl bg-[#269460] px-5 text-xl text-white shadow-md transition-all duration-300 hover:opacity-80 active:opacity-100"
  >
    Buy Now
  </button>

  {/* Your title section */}
  
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