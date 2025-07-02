import { FBXLoader } from 'three/examples/jsm/Addons.js'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useScroll, useTexture } from '@react-three/drei'

interface Props {
  url: string
  bandColor: number
  frameColor: number
  cityZoom: boolean
}

function FbxModel({ url, bandColor, frameColor, popUp, setPopUp }: Props) {
  const original = useLoader(FBXLoader, url)
  const fbx = original.clone(true)
  const modelRef = useRef<THREE.Group>(null!)
  const texture = useTexture('/3dmodels/watchnewtexture.png')
  const [start, setStart] = useState(false)
  const [zoom, setZoom] = useState(false)
  const scroll = useScroll()

  useEffect(() => {
    fbx.traverse((child) => {
      if (child.isMesh && child.name === 'Glass') {
        child.material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        })
        child.material.needsUpdate = true
      } else if (child.name === 'UpperBelt' || child.name === 'LowerBelt') {
        child.material = new THREE.MeshPhongMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          color: bandColor,
        })
        child.material.needsUpdate = true
      } else if (child.name !== 'Glass') {
        child.material = new THREE.MeshPhongMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          color: frameColor,
        })
        child.material.needsUpdate = true
      }

      child.material.opacity = 1
    })
  }, [fbx, texture, bandColor, frameColor])

  useFrame(() => {
    if (!start && scroll.offset > 0.85) setStart(true)
    if (start) {
      fbx.traverse((child) => {
        if (child.material.opacity < 1) child.material.opacity += 0.005
      })
      if (modelRef.current.position.x > 0) modelRef.current.position.x -= 0.32
      if (modelRef.current.position.y < -19) modelRef.current.position.y += 0.15
      if (modelRef.current.position.z < -5) modelRef.current.position.z += 0.2
      if (modelRef.current.rotation.x > 0) modelRef.current.rotation.x -= 0.02
      if (modelRef.current.rotation.y > 0) modelRef.current.rotation.y -= 0.02
      if (modelRef.current.rotation.z > 0) modelRef.current.rotation.z -= 0.02

      if (
        modelRef.current.position.x <= 0 &&
        modelRef.current.position.y >= -19 &&
        modelRef.current.position.z >= -5 &&
        modelRef.current.rotation.x <= 0 &&
        modelRef.current.rotation.y <= 0 &&
        modelRef.current.rotation.z <= 0 &&
        !zoom
      ) {
        setZoom(true)
      }

      if (zoom === true) {
        modelRef.current.position.z += 0.05
        modelRef.current.scale.x += 0.001
        modelRef.current.scale.y += 0.001
        modelRef.current.scale.z += 0.001
        fbx.traverse((child) => {
          if (child.material.opacity > 0) child.material.opacity -= 0.014
        })
      }
      if (zoom === true && !popUp && modelRef.current.scale.x > 0.1)
        setPopUp(true)
    }
  })
  //30, -15 //
  return (
    <group
      ref={modelRef}
      position={[40, -39, -25]}
      scale={[0.05, 0.05, 0.05]}
      rotation={[2.5, 2.5, 2.5]}
    >
      <primitive object={fbx} />
    </group>
  )
}

export default FbxModel
