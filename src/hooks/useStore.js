import { nanoid } from 'nanoid'
import create from 'zustand'

export const useStore = create((set) => ({
  texture: 'dirt',
  cubes: [
    {
      id: nanoid(),
      texture: 'grass',
      pos: [1, 3, 1],
    },
  ],
  addCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          texture: state.texture,
          pos: [x, y, z],
        },
      ],
    }))
  },
  removeCube: (id) => {
    set((state) => ({
      cubes: state.cubes.filter((cube) => {
        return cube.id !== id
      }),
    }))
  },
  setTexture: (texture) => {
    set(() => ({ texture }))
  },
  saveWorld: () => {},
  resetWorld: () => {},
}))
