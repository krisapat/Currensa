import { useGLTF } from '@react-three/drei'
import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
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
  const modelRef = useRef<THREE.Object3D>(null)
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01 // หมุนรอบตัวเอง
    }
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScaleArray([0.03, 0.03, 0.03])
      } else if (width < 1024) {
        setScaleArray([0.04, 0.04, 0.04])
      } else {
        setScaleArray([0.05, 0.05, 0.05])
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <group
      ref={group}
      scale={scale}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]} // ให้เริ่มหันตรง
      {...props}
    >
      <primitive object={scene} ref={modelRef} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
