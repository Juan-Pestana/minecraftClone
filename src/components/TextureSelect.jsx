import * as images from '../images/images.js'
import { useStore } from '../hooks/useStore.js'
import { useEffect, useState } from 'react'
import { useKeyboard } from '../hooks/useKeyboard.js'

export function TextureSelect() {
  const [texture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ])
  // console.log(texture)
  const [visible, setVisible] = useState(false)

  const { dirt, grass, glass, wood, log } = useKeyboard()

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false)
    }, 3000)
    setVisible(true)

    return () => {
      clearTimeout(visibilityTimeout)
    }
  }, [texture])

  useEffect(() => {
    const options = {
      dirt,
      grass,
      glass,
      wood,
      log,
    }
    const selectedTexture = Object.entries(options).find(
      ([texture, isEnabled]) => isEnabled || options[texture]
    )
    if (selectedTexture) {
      //const [textureName] = selectedTexture
      console.log(selectedTexture)
      setTexture(selectedTexture[0])
    }
  }, [dirt, grass, glass, wood, log])

  if (!visible) {
    return null
  }

  return (
    <div className="texture-selector">
      {Object.entries(images).map(([imgKey, img]) => {
        return (
          <img
            className={
              texture === imgKey.replace('Img', '') ? 'selected' : null
            }
            key={imgKey}
            src={img}
            alt={imgKey}
          />
        )
      })}
    </div>
  )
}
