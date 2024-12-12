import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

interface DoctorModelProps {
  rotating: boolean;
  [key: string]: any;
}

export default function DoctorModel({ rotating, ...props }: DoctorModelProps) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF("/assets/3d/duck.glb")

  useFrame((state, delta) => {
    if (rotating) {
      if (group.current) {
        group.current.rotation.y += delta * 0.5
      }
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.character_duck as THREE.Mesh).geometry}
        material={materials.character_duck}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload("/assets/3d/duck.glb")

