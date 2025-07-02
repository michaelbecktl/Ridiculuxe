/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader, BackSide } from 'three'

function NatureViewer({ opacity = 1 }: { opacity?: number }) {
  const texture = useLoader(TextureLoader, '/LuxeVision/Nature-360.jpg')

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 64, 32]} />
        <meshBasicMaterial
          map={texture}
          side={BackSide}
          transparent
          opacity={opacity}
          depthWrite={false}
          depthTest={false} // ⬅️ Add this line
        />
      </mesh>
      <OrbitControls enableZoom={false} makeDefault />
    </>
  )
}

export default NatureViewer
