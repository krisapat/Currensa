'use client'
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, Environment } from '@react-three/drei'
import MyModel from "./MyModel"

const UseModel = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // เช็คครั้งแรก
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-3, -3, 5]} intensity={0.5} color="#ffe599" />
      <Center>
        <MyModel />
      </Center>
      {!isMobile && (
        <OrbitControls enableZoom={false} enableRotate={true} target={[0, 0, 0]} />
      )}

      <Environment preset="sunset" background={false} />
    </Canvas>
  )
}

export default UseModel
