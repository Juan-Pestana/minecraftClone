import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import { useStore } from '../hooks/useStore'

import * as textures from '../images/textures'

export function Cube({ id, position, texture }) {
  const [removeCube, addCube] = useStore((state) => [
    state.removeCube,
    state.addCube,
  ])

  const [isHovered, setIsHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: 'Static',
    position: position,
  }))

  const [x, y, z] = position

  const faces = {
    4: [x, y, z + 1],
    1: [x - 1, y, z],
    5: [x, y, z - 1],
    0: [x + 1, y, z],
    2: [x, y + 1, z],
    3: [x, y - 1, z],
  }

  const clickedCube = (e) => {
    e.stopPropagation()
    const clickedFace = Math.floor(e.faceIndex / 2)
    console.log(clickedFace)
    if (e.altKey) {
      removeCube(id)
    } else {
      addCube(...faces[clickedFace])
    }
  }

  const activeTexture = textures[texture + 'Texture']

  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerLeave={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      onClick={clickedCube}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        map={activeTexture}
        attach="material"
        color={isHovered ? 'grey' : 'white'}
        transparent
      />
    </mesh>
  )
}
