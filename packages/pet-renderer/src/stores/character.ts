import { defineStore } from 'pinia'
import type { CharacterInstance } from '@inabapet/types'
import { ref } from 'vue'

export const useCharacterStore = defineStore('character', () => {
  const characters = ref<CharacterInstance>()

  function setCharacter(data: CharacterInstance) {
    characters.value = data
  }

  function getCharacter() {
    return characters
  }

  return { setCharacter, getCharacter }
})
