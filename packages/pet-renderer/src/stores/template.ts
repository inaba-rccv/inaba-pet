import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CharacterInstance } from '@inabapet/types'

export const useTemplateStore = defineStore('template', () => {
  function getCharacterCache(): CharacterInstance[] {
    return [{
      id: '971b0138-911c-4863-58c4-59057ba8f1f3',
      name: 'inaba',
      isPrimary: true,
      stateBarVisiable: true,
      attribution: {
        favor: 5,
        health: 100,
        satiety: 100
      }
    }]
  }

  return { getCharacterCache }
})
