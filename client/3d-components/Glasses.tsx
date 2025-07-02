/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import { useRef, useEffect } from 'react'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function Glasses({
  setFadeOpacity,
}: {
  setFadeOpacity: (val: number) => void
}) {
  const glasses = useLoader(MTLLoader, '/LuxeVision/3d-vr-glasses.mtl')

  const obj = useLoader(
    OBJLoader,
    '/LuxeVision/3d-vr-glasses.obj',
    (loader) => {
      glasses.preload()
      loader.setMaterials(glasses)
    },
  )

  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()

  const fadeStartTime = useRef<number | null>(null)
  const blurTriggered = useRef(false)

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.PI / 12 // Slight downward tilt
    }
  }, [])

  useFrame((state, delta) => {
    const scrollOffset = scroll.offset
    if (!groupRef.current) return
    const group = groupRef.current

    const targetY = -Math.PI / 2
    const isEnd = scrollOffset > 0.95

    // 🔄 Rotate
    if (!isEnd) {
      group.rotation.y += delta * 0.8
      fadeStartTime.current = null
      blurTriggered.current = false
      setFadeOpacity(1)
    } else {
      group.rotation.y += (targetY - group.rotation.y) * 5 * delta
      const rotationComplete = Math.abs(group.rotation.y - targetY) < 0.01

      if (rotationComplete) {
        group.rotation.y = targetY

        // ✅ Start fade timer once when rotation finishes
        if (!blurTriggered.current) {
          blurTriggered.current = true
          fadeStartTime.current = state.clock.elapsedTime
        }
      }
    }

    // 🌫 Time-based fade
    let opacity = 1
    if (fadeStartTime.current !== null) {
      const elapsed = state.clock.elapsedTime - fadeStartTime.current
      const fadeDuration = 2 // seconds
      opacity = THREE.MathUtils.clamp(1 - elapsed / fadeDuration, 0, 1)
      setFadeOpacity(opacity)
    }

    // 📍 Position shift
    const defaultPosition = new THREE.Vector3(0, 0, 0)
    const finalPosition = new THREE.Vector3(-0.37, -0.2, 0)
    const newPosition = defaultPosition
      .clone()
      .lerp(finalPosition, THREE.MathUtils.smoothstep(scrollOffset, 0.95, 1))
    group.position.lerp(newPosition, 0.1)

    // 🎨 Apply material opacity
    group.traverse((child) => {
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        mat.transparent = true
        mat.opacity = opacity
      }
    })
  })

  return (
    <group ref={groupRef} scale={0.001}>
      <primitive object={obj} />
    </group>
  )
}
