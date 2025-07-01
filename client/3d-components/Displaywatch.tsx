import { FBXLoader } from 'three/examples/jsm/Addons.js'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { Children, useEffect, useRef, useState } from 'react'
import { useScroll, useTexture } from '@react-three/drei'

function FbxModel({ url }: { url: string }) {
  const fbx = useLoader(FBXLoader, url)
  const modelRef = useRef<THREE.Group>(null!)
  const texture = useTexture('/3dmodels/watchtexture.png')
  const scroll = useScroll()

  const [clockwise, setClockwise] = useState(true)
  let accelerateCW = 0
  let accelerateCCW = 0

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh && child.name === 'Glass') {
        child.material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        })
        if (child.name !== 'Glass') {
          child.material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
          })
        }
        child.material.needsUpdate = true
      }
      if (child.name !== 'Glass') {
        child.material = new THREE.MeshPhongMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          color: 0xffffff,
        })
      }
      child.material.needsUpdate = true
      child.material.opacity = 0
    })
  }, [fbx, texture])

  useFrame(() => {
    modelRef.current.rotation.y += accelerateCW
    modelRef.current.rotation.y += accelerateCCW
    if (clockwise) {
      if (accelerateCW < 0.001) accelerateCW += 0.0001
      if (accelerateCCW <= 0) accelerateCCW += 0.00001
    }
    if (!clockwise) {
      if (accelerateCCW > -0.001) accelerateCCW -= 0.0001
      if (accelerateCW >= 0) accelerateCW -= 0.00001
    }
    if (modelRef.current.rotation.y > 1.2) {
      setClockwise(false)
    }
    if (modelRef.current.rotation.y < -0.3) {
      setClockwise(true)
    }
    fbx.traverse((child) => {
      if (child.material.opacity < 1) child.material.opacity += 0.005
    })
    modelRef.current.position.y = scroll.offset * 20 + 2
  })

  return (
    <group
      ref={modelRef}
      position={[-7.5, 2, -5]}
      scale={[0.05, 0.05, 0.05]}
      rotation={[-0.3, 0, 0]}
    >
      <primitive object={fbx} />
    </group>
  )
}

export default FbxModel
