import { FBXLoader } from 'three/examples/jsm/Addons.js'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { Children, useEffect, useRef } from 'react'
import { useTexture } from '@react-three/drei'

function FbxModel({ url }: { url: string }) {
  const fbx = useLoader(FBXLoader, url)
  const modelRef = useRef<THREE.Group>(null!)
  const texture = useTexture('/3dmodels/watchtexture.png')

  // useEffect(() => {
  //   fbx.traverse((child) => {
  //     if (child.isMesh) {
  //       child.material.map = texture
  //       child.material.needsUpdate = true
  //     }
  //   })
  // }, [fbx, texture])

  useEffect(() => {
    const i = 0
    fbx.traverse((child) => {
      console.log(child)
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
    })
  }, [fbx, texture])

  useFrame(() => {
    modelRef.current.rotation.z += 0.001
  })

  return (
    <group
      ref={modelRef}
      position={[-12, 0, -10]}
      scale={[0.05, 0.05, 0.05]}
      rotation={[-1.5, 0, 0.5]}
    >
      <primitive object={fbx} />
    </group>
  )
}

export default FbxModel
