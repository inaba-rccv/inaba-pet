import { defineStore } from 'pinia'
import type { CharacterInstance } from '@inabapet/types'

export const useCharacterStore = defineStore('character', () => {
  const characters: Map<string, CharacterInstance> = new Map()

  function setCharacter(id: string, data: CharacterInstance) {
    characters.set(id, data)
  }

  function getCharacters() {
    return characters
  }

  function getCharacter(id: string) {
    return characters.get(id)
  }

  return { setCharacter, getCharacter, getCharacters }
})
