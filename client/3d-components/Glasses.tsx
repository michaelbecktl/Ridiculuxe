/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'

export default function Glasses() {
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

  return <primitive object={obj} scale={0.001} position={[0, 0, 0]} />
}
