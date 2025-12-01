<script lang="ts" setup>
import { computed } from "vue";
import "./index.scss"

const props = withDefaults(defineProps<{
  stateTitle: string
  innerColor: string
  maxValue: number
  value: number
}>(), {})

const percentText = computed(() => props.value / props.maxValue * 100 + '%')
</script>

<template>
  <div
    class="percent-bar__container"
    :style="{
      '--percent': percentText
    }"
    :title="`${stateTitle}:${value}`"
  >
    <div
      class="percent-bar__inner"
      :style="{
        backgroundColor: innerColor
      }"  
    ></div>
  </div>
</template>