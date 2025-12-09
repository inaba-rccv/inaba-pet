<script lang="ts" setup>
import "./index.scss"
import Sprite from "@/views/sprite/index.vue"
import { useCharacterStore } from "@/stores/character"

const { getCharacter } = useCharacterStore()
const character = getCharacter()
</script>

<template>
  <div class="canvas-container">
    <div class="draw-board">
      <sprite
        v-if="character"
        :data="character"
      ></sprite>
    </div>
  </div>
</template>