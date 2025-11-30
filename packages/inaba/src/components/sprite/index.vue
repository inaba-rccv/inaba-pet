<script lang="ts" setup>
import SpriteImage from '@/components/sprite/sprite-image.vue'
import type { Character, CharacterState } from '@/types/Character';

withDefaults(defineProps<{
  model: Character
  state: CharacterState
  transformX: number
  transformY: number
  flip?: boolean
}>(), {
  state: 'stand',
  transformX: 0,
  transformY: 0,
  flip: false
})

</script>


<template>
  <sprite-image
    :frame="model.sprites[state].frame"
    :src="model.sprites[state].src"
    :style="{
      transform: `translate(${transformX}px, ${transformY}px) scaleX(${flip ? -1 : 1})`,
    }"
  />
</template>