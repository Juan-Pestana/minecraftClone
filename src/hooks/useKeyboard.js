import { useState, useEffect } from 'react'

const ACTIONS_KEYBOARD_MAP = {
  KeyW: 'moveForward',
  KeyS: 'moveBackward',
  KeyA: 'moveLeft',
  KeyD: 'moveRight',
  Space: 'jump',
  Numpad1: 'dirt',
  Numpad2: 'glass',
  Numpad3: 'grass',
  Numpad4: 'log',
  Numpad5: 'wood',
}

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { code } = event
      const action = ACTIONS_KEYBOARD_MAP[code]

      if (action) {
        if (actions[action]) return
        setActions((prevActions) => ({
          ...prevActions,
          [action]: true,
        }))
      }
    }

    const handleKeyUp = (event) => {
      const { code } = event

      const action = ACTIONS_KEYBOARD_MAP[code]

      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: false,
        }))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return actions
}