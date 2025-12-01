<script lang="ts" setup>
import SpriteImage from '@/components/sprite/sprite-image.vue'
import { useKeyboard } from '@/hooks/use-keyboard';
import { useSprite } from '@/hooks/use-sprite';
import { useSpriteMovement } from '@/hooks/use-sprite-movement';
import { CharacterModels } from '@/models';
import { ChatService } from '@/modules';
import { extractSpriteImageSrc, preloadImage } from '@/utils';
import type { CharacterInstance, SpriteModelState } from '@inabapet/types' 
import StateBar from "@/components/state-bar/index.vue"
import { computed, onMounted, getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
const { $MessageBox } = instance!.appContext.config.globalProperties

const props = withDefaults(defineProps<{
  data: CharacterInstance
}>(), {})

let spriteState: SpriteModelState
const { keyState } = useKeyboard()
if (window.electronAPI) {
  spriteState = useSprite(keyState).spriteState
} else {
  spriteState = useSpriteMovement(keyState).spriteState
}
const model = computed(() => CharacterModels.get(props.data.name))
const chatService = new ChatService()

function clickSpriteEvent() {
  const soliloquize = chatService.getSoliloquize()
  $MessageBox.confirm({
    message: soliloquize.message,
    draggable: false,
    // x: 0,
    // y: 0,
    // overflow: false
  })
  props.data.attribution.health -= 1
}

onMounted(() => {
  model.value && preloadImage.batchPreload(extractSpriteImageSrc(model.value))
})
</script>

<template>
  <div class="sprite-main relative">
    <sprite-image
      v-if="model"
      :frame="model.sprites[spriteState.state].frame"
      :src="model.sprites[spriteState.state].src"
      :style="{
        transform: `translate(${spriteState.transformX}px, ${spriteState.transformY}px) scaleX(${spriteState.flip ? -1 : 1})`,
      }"
      @click="clickSpriteEvent"
    />
    <state-bar v-if="data.stateBarVisiable" :option="data.attribution"></state-bar>
  </div>
</template>