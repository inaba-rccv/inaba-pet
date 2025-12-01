
<script setup lang="ts">
import "./index.scss"

withDefaults(defineProps<{
  src: string
  frame: number
}>(), {
})
</script>
<template>
  <div class="sprite-image-container">
    <div
      class="sprite-image"
      :style="{
        '--frame': frame,
        backgroundImage: `url(${src})`
      }"
    ></div>
  </div>
</template>
