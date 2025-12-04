<script lang="ts" setup>
import "./index.scss"
import { onMounted, ref } from "vue"
import Sprite from "@/components/sprite/index.vue"
import { type CharacterInstance } from "@inabapet/types"
import { useCharacterStore } from "@/stores/character"


const { getCharacters } = useCharacterStore()
const characters = ref<Map<string, CharacterInstance>>()

onMounted(() => {
  const characterCache = getCharacters()
  let primaryCharacterCount = 0
  characterCache.forEach(character => character.isPrimary && primaryCharacterCount++)

  if (primaryCharacterCount > 1) {
    // 报错
  } else {
    characters.value = characterCache
  }
})
</script>

<template>
  <div class="canvas-container">
    <div class="draw-board">
      <sprite
        v-for="[id, character] in characters"
        :key="id"
        :data="character"
      ></sprite>
    </div>
  </div>
</template>