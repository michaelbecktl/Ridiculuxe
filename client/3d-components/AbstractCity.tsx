import { FBXLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'

function ObjModel({ url, loaded }) {
  const obj = useLoader(FBXLoader, url)
  const groupRef = useRef<THREE.Group>(null!)

  useEffect(() => {
    obj.traverse((child) => {
      child.material = new THREE.MeshPhongMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        color: 0xf0f0f0,
      })
      child.material.needsUpdate = true

      child.material.opacity = 0
    })
  }, [obj])

  let scaleVelocity = 0.005
  let posVelocity = 0.25
  const damping = 0.995

  useFrame((state) => {
    const timeElapsed = state.clock.getElapsedTime()
    if (loaded && timeElapsed > 5.3) {
      obj.traverse((child) => {
        if (child.material.opacity < 0.9)
          child.material.opacity += scaleVelocity
      })
      scaleVelocity *= damping
      posVelocity *= damping
      if (groupRef.current.scale.y < 1)
        groupRef.current.scale.y += scaleVelocity
      if (groupRef.current.scale.x < 1)
        groupRef.current.scale.x += scaleVelocity
      if (groupRef.current.scale.z < 1)
        groupRef.current.scale.z += scaleVelocity
      if (groupRef.current.position.z < -20)
        groupRef.current.position.z += posVelocity
      if (loaded) groupRef.current.rotation.y += 0.0001
    }
  })

  return (
    <group ref={groupRef} scale={[0, 0, 0]} position={[0, -50, -50]}>
      <primitive object={obj} rotation={[0.5, 0.5, 0]} />
    </group>
  )

  // const [object, setObject] = useState()

  // useEffect(() => {
  //   const mtlLoader = new MTLLoader()
  //   mtlLoader.load('/3dmodels/LowpolyCity.mtl', (materials) => {
  //     materials.preload()
  //     const objLoader = new OBJLoader()
  //     objLoader.setMaterials(materials)
  //     objLoader.load('/3dmodels/LowpolyCity.obj', (obj) => {
  //       setObject(obj)
  //     })
  //   })
  // }, [])

  // return object ? (
  //   <group>
  //     <primitive object={object} position={[0, -50, 0]} />
  //   </group>
  // ) : null
}

export default ObjModel
