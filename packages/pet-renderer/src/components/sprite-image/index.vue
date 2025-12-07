<script setup lang="ts">
import "./index.scss"

withDefaults(defineProps<{
  src: string
  frame: number
  flip: boolean
}>(), {
})
</script>
<template>
  <div class="sprite-image-container"
    :style="{
      transform: `scaleX(${flip ? -1 : 1})`,
    }"
  >
    <div
      class="sprite-image"
      :style="{
        '--frame': frame,
        backgroundImage: `url(${src})`
      }"
    ></div>
  </div>
</template>
