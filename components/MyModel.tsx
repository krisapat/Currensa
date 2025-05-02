'use client'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useRef, useEffect, useState, useMemo } from 'react'
import { Group, Vector3 } from 'three'

const MODEL_PATH = '/models/bitcoin.glb'

type GLTFResult = {
  scene: THREE.Group
}

export default function MyModel(props: React.ComponentProps<'group'>) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF(MODEL_PATH) as GLTFResult
  const [scaleArray, setScaleArray] = useState<[number, number, number]>([0.05, 0.05, 0.05])

  const scale = useMemo(() => new Vector3(...scaleArray), [scaleArray])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 768) {
        setScaleArray([0.03, 0.03, 0.03]) // มือถือ
      } else if (width < 1024) {
        setScaleArray([0.04, 0.04, 0.04]) // แท็บเล็ต
      } else {
        setScaleArray([0.05, 0.05, 0.05]) // เดสก์ท็อป
      }
    }

    handleResize() // เรียกตอนเริ่ม
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <group
      ref={group}
      scale={scale}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
      {...props}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
