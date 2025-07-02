/* eslint-disable react/no-unknown-property */
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { Scroll, ScrollControls, OrbitControls } from '@react-three/drei'
import { Link } from 'react-router-dom'
import { MTLLoader } from 'three/examples/jsm/Addons.js'
import { OBJLoader } from 'three/examples/jsm/Addons.js'

function LuxeVision() {
  function Glasses() {
    const glasses = useLoader(MTLLoader, '/LuxeVision/3d-vr-glasses.mtl')

    const obj = useLoader(
      OBJLoader,
      '/LuxeVision/3d-vr-glasses.obj',
      (loader) => {
        glasses.preload()
        loader.setMaterials(glasses)
      },
    )

    obj.rotation.x = Math.PI / 12

    useFrame((state, delta) => {
      obj.rotation.y += delta * 0.8
    })

    return <primitive object={obj} scale={0.001} />
  }

  return (
    <div className="h-screen w-screen">
      <Link to={`/shop/LuxeVision`}>LuxeVision</Link>
      <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <directionalLight position={[5, 5, 5]} />
        {/* Add Only ThreeJS Components here if you want them to stay still as background */}
        <ScrollControls pages={3} damping={0.1}>
          <Scroll>
            <Glasses />
            {/* Add Only ThreeJS Components here if you want them to be moved from scrolling */}
          </Scroll>
          <Scroll html>
            <p>
              Experience next-generation immersion with our state-of-the-art VR
              glasses.
            </p>
            <p>
              Redefining virtual reality with precision optics and advanced
              motion tracking.
            </p>
            <p>
              Designed for clarity, comfort, and total immersion—VR glasses
              built for the future.
            </p>
            <p>
              Step into a new dimension with premium VR glasses crafted for
              seamless performance.
            </p>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default LuxeVision
