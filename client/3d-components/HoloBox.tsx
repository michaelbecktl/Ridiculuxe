import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function HoloBox() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const matRef = useRef<THREE.MeshStandardMaterial>(null!)
  const [start, setStart] = useState(false)

  useFrame((state) => {
    const timeElapsed = state.clock.getElapsedTime()
    meshRef.current.rotation.z += 0.03
    meshRef.current.rotation.x += 0.03

    if (!start && meshRef.current && timeElapsed > 0.3) {
      setStart(true)
    }

    if (matRef.current.opacity < 1) {
      matRef.current.opacity += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[-8.2, 3, -5]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={0x0388fc}
        opacity={0}
        ref={matRef}
        transparent={true}
      />
    </mesh>
  )
}

export default HoloBox
