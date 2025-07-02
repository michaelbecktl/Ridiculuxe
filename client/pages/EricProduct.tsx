import { useNavigate } from 'react-router-dom'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Text } from '@react-three/drei'
import '../styles/Nanobot.css'

function NanobotModel() {
  const group = useRef<any>()
  const glowLight = useRef<any>()
  const textRef = useRef<any>()
  const { scene } = useGLTF('/3dmodelsNano/scene.gltf')
  const [hovered, setHovered] = useState(false)
  const { gl } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    group.current.position.y = Math.sin(t * 2) * 2

    if (glowLight.current) {
      glowLight.current.intensity = 1.5 + Math.sin(t * 4)
    }

    const targetScale = hovered ? 1.8 : 1.5
    group.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale },
      0.1,
    )

    if (textRef.current) {
      textRef.current.position.y = 15 + Math.sin(t * 2) * 0.3 // Raised Y-position
      textRef.current.material.opacity = hovered
        ? Math.min(textRef.current.material.opacity + 0.1, 1)
        : Math.max(textRef.current.material.opacity - 0.1, 0)
    }
  })

  useEffect(() => {
    gl.domElement.style.cursor = hovered ? 'pointer' : 'default'
  }, [hovered, gl.domElement])

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />

      <pointLight
        ref={glowLight}
        color={'#00faff'}
        intensity={2}
        distance={20}
        decay={2}
        position={[0, 0, 0]}
      />

      <Text
        ref={textRef}
        position={[0, 0, 40]}
        fontSize={3}
        color="#00faff"
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0}
      >
        {`An autonomous Nanobot designed for intrabody navigation,
    capable of real-time pathological detection at the cellular level
                 and precision-targeted therapeutic delivery 
                                at nanoscale resolution.`}
      </Text>
    </group>
  )
}

function NanobotViewer() {
  return (
    <div className="mx-auto h-[500px] w-full max-w-5xl rounded-lg bg-[#111] p-4 shadow-lg">
      <Canvas camera={{ position: [0, 45, 150], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 3]} intensity={2} />
        <Environment files={'/NanoBackground.hdr'} background />
        <Suspense fallback={null}>
          <NanobotModel />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          autoRotate
          autoRotateSpeed={5}
          maxDistance={200}
        />
      </Canvas>
    </div>
  )
}

const NanobotLandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const navigate = useNavigate()
  const handleClick = () => navigate('/shop/Nanobot')

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current
          if (!video) return

          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      {
        threshold: 0.5,
      },
    )

    if (videoRef.current) observer.observe(videoRef.current)

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current)
    }
  }, [])

  return (
    <div className="overflow-x-hidden bg-[#0a0a0f] font-sans text-white">
      <header
        className="relative flex h-screen items-center justify-center bg-cover bg-center text-center"
        style={{
          backgroundImage: "url('/images/nanobot-hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#00faff55] via-[#0a0a0f88] to-[#ff00ff55] opacity-90 mix-blend-screen"></div>

        <div className="absolute inset-0 z-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 px-4">
          <h1 className="mb-4 text-4xl font-bold text-[#00faff] drop-shadow-[0_2px_6px_rgba(0,255,255,0.6)] md:text-6xl">
            Nanobot:
            <br />
            Healing from the Inside Out
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-lg md:text-xl">
            A revolutionary micro‑robot that seeks and destroys disease—inside
            your body.
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <a onClick={handleClick} className="btn-12 mx-auto">
              <span>Now</span>
              <span>Buy</span>
            </a>
          </div>
        </div>
      </header>

      <video
        ref={videoRef}
        className="h-auto w-full object-cover"
        src="/Nanobot.mp4"
        muted
        playsInline
        preload="auto"
      />

      <section id="features" className="px-4 py-20 text-center">
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">Features</h2>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8">
          <div className="w-full rounded-xl bg-[#111] p-8 shadow-md md:w-1/3">
            <h3 className="mb-4 text-2xl font-semibold text-[#33ff99]">
              Invisible Precision
            </h3>
            <p>Sub‑micron accuracy in detecting and eliminating pathogens.</p>
          </div>
          <div className="w-full rounded-xl bg-[#111] p-8 shadow-md md:w-1/3">
            <h3 className="mb-4 text-2xl font-semibold text-[#33ff99]">
              Targeted Healing
            </h3>
            <p>Delivers micro‑medicine directly where it’s needed.</p>
          </div>
          <div className="w-full rounded-xl bg-[#111] p-8 shadow-md md:w-1/3">
            <h3 className="mb-4 text-2xl font-semibold text-[#33ff99]">
              Self‑Powered
            </h3>
            <p>
              Harvests energy from blood plasma—no external batteries required.
            </p>
          </div>
        </div>
      </section>

      <section id="demo" className="px-4 py-20 text-center">
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">
          See Nanobot in Action
        </h2>
        <NanobotViewer />
      </section>
    </div>
  )
}

export default NanobotLandingPage
