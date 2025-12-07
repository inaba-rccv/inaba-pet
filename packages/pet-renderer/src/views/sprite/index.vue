<script lang="ts" setup>
import "./index.scss"
import { computed, onMounted, provide, ref } from 'vue'
import { CharacterModels } from '@/models';
import { setMouseIgnore } from '@/modules';
import { extractSpriteImageSrc, preloadImage } from '@/utils';
import type { CharacterInstance } from '@inabapet/types' 
import { characterInstanceInjectKey, characterModelInjectKey } from '.';
import spriteMain from './sprite-main.vue';

const props = withDefaults(defineProps<{
  data: CharacterInstance
}>(), {})

// 获取模型数据
const model = computed(() => CharacterModels.get(props.data.name)!)
provide(characterModelInjectKey, model)
provide(characterInstanceInjectKey, props.data)

// 鼠标聚焦事件
const hypothesisActiveState = ref(false)
function mouseEnterEvent() {
  if (hypothesisActiveState.value) return
  hypothesisActiveState.value = true
  setMouseIgnore(false)
}
function mouseLeaveEvent() {
  if (!hypothesisActiveState.value) return
  hypothesisActiveState.value = false
  setMouseIgnore(true)
}

onMounted(() => {
  model.value && preloadImage.batchPreload(extractSpriteImageSrc(model.value))
})
</script>

<template>
  <div
    class="sprite-container relative"
    @mouseenter="mouseEnterEvent"
    @mouseleave="mouseLeaveEvent"
  >
    <sprite-main></sprite-main>
  </div>
</template>