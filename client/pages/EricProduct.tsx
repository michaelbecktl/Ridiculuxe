import { Canvas } from '@react-three/fiber'
import { Scroll, ScrollControls } from '@react-three/drei'
import { Link } from 'react-router-dom'

function EricProduct() {
  // Change the name of the routes too if you want to change the component name //
  return (
    <>
      <Link to={`/shop/ericproduct`}>ericproduct</Link>
      <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <directionalLight position={[5, 5, 5]} />
        {/* Add Only ThreeJS Components here if you want them to stay still as background */}
        <ScrollControls pages={3} damping={0.1}>
          <Scroll>
            {/* Add Only ThreeJS Components here if you want them to be moved from scrolling */}
          </Scroll>
          <Scroll html>{/* Add HTML components here */}</Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default EricProduct
