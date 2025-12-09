import type { CharacterAssets, CharacterInstance } from "@inabapet/types"
import { getStore, setStore } from "../libs/store.ts"

export const characterInitData = {
  id: '971b0138-911c-4863-58c4-59057ba8f1f3',
  name: 'inaba',
  isPrimary: true,
  stateBarVisiable: true,
  adventureData: {
    attribution: {
      favor: 5,
      health: 100,
      satiety: 100,
      maxHealth: 100,
      attack: 10,
      defense: 0,
      speed: 5,
    },
    items: []
  }
}

export function getPrimaryCharacter(): CharacterInstance {
  let characterInstance: CharacterInstance = getStore('primaryCharacter')
  if (!characterInstance) {
    setStore('primaryCharacter', characterInitData)
    characterInstance = characterInitData
  }
  return characterInstance
}