<script lang="ts" setup>
import "./index.scss"
import { onMounted, ref } from "vue"
import Sprite from "@/components/sprite/index.vue"
import { type CharacterInstance } from "@inabapet/types"
import { useTemplateStore } from "@/stores/template"


const { getCharacterCache } = useTemplateStore()
const characters = ref<CharacterInstance[]>([])

onMounted(() => {
  const characterCache = getCharacterCache()
  const primaryCharacterCount = characterCache.filter(character => character.isPrimary).length

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
        v-for="character in characters"
        :key="character.id"
        :data="character"
      ></sprite>
    </div>
  </div>
</template>