import type { CharacterAssets, CharacterInstance } from "@inabapet/types"
import { getStore, setStore } from "../libs/store.ts"

export const characterInitData: CharacterInstance = {
  id: '971b0138-911c-4863-58c4-59057ba8f1f3',
  name: 'inaba',
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
    equipment: [null, null],
    items: [null, null, {
      itemId: 1,
      count: 2
    }, {
      itemId: 1001,
      count: 1
    }, null]
  }
}

export function getPrimaryCharacter(): CharacterInstance {
  setStore('primaryCharacter', null)

  let characterInstance: CharacterInstance = getStore('primaryCharacter')
  if (!characterInstance) {
    setStore('primaryCharacter', characterInitData)
    characterInstance = characterInitData
  }
  return characterInstance
}

export function setPrimaryCharacter(character: CharacterInstance): void {
  setStore('primaryCharacter', character)
}