/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { ScrollControls, OrbitControls } from '@react-three/drei'
import Glasses from '../3d-components/Glasses'
import { OverlayText } from '../3d-components/OverlayText'

export default function LuxeVision() {
  // Prevent page-level scrolling
  document.body.style.height = '100%'
  document.body.style.overflow = 'hidden'

  return (
    <>
      <div className="h-screen w-screen">
        <Canvas>
          <directionalLight intensity={1} />
          <OrbitControls enableZoom={false} />
          <ScrollControls pages={4} damping={0.25}>
            <OverlayText />
            <Glasses />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  )

  // return (
  //   <div className="h-screen w-screen">
  //     <Link to={`/shop/LuxeVision`}>LuxeVision</Link>
  //     <Canvas gl={{ alpha: true }} style={{ background: 'transparent' }}>
  //       <OrbitControls enableZoom={false} enablePan={false} />
  //       <directionalLight position={[5, 5, 5]} />
  //       {/* Add Only ThreeJS Components here if you want them to stay still as background */}
  //       <ScrollControls pages={3} damping={0.1}>
  //         <Scroll>
  //           <Glasses />
  //           {/* Add Only ThreeJS Components here if you want them to be moved from scrolling */}
  //         </Scroll>
  //         <Scroll html>
  //           <div className="absolute left-[1200px] top-[100px] w-[300px]">
  //             <p>
  //               Experience next-generation immersion with our state-of-the-art
  //               VR glasses.
  //             </p>
  //           </div>
  //           <div className="absolute left-[1200px] top-[300px] w-[300px]">
  //             <p>
  //               Redefining virtual reality with precision optics and advanced
  //               motion tracking.
  //             </p>
  //           </div>
  //           <div className="absolute left-[1200px] top-[500px] w-[300px]">
  //             <p>
  //               Designed for clarity, comfort, and total immersion—VR glasses
  //               built for the future.
  //             </p>
  //           </div>
  //           <div className="absolute left-[1200px] top-[700px] w-[300px]">
  //             <p>
  //               Step into a new dimension with premium VR glasses crafted for
  //               seamless performance.
  //             </p>
  //           </div>
  //         </Scroll>
  //       </ScrollControls>
  //     </Canvas>
  //   </div>
  // )
}
