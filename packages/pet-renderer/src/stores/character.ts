import { defineStore } from 'pinia'
import type { CharacterInstance, PackageItem } from '@inabapet/types'
import { ref } from 'vue'

export const useCharacterStore = defineStore('character', () => {
  const character = ref<CharacterInstance>()

  function setCharacter(data: CharacterInstance) {
    console.log('data', data)
    character.value = data
  }

  function getCharacter() {
    return character
  }

  function setCharacterAdventureItem(adventureItems: PackageItem[]) {
    character.value && (character.value.adventureData.items = adventureItems)
  }

  return { setCharacter, getCharacter, setCharacterAdventureItem }
})
