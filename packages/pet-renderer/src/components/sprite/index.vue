<script lang="ts" setup>
import SpriteImage from '@/components/sprite/sprite-image.vue'
import { useKeyboard } from '@/hooks/use-keyboard';
import { useSprite } from '@/hooks/use-sprite';
import { useSpriteMovement } from '@/hooks/use-sprite-movement';
import { CharacterModels } from '@/models';
import { ChatService, setMouseIgnore } from '@/modules';
import { extractSpriteImageSrc, preloadImage } from '@/utils';
import type { CharacterInstance, DialogueData, DialogueOption, SpriteModelState } from '@inabapet/types' 
import StateBar from "@/components/state-bar/index.vue"
import DialogBox from "@/components/dialog-box/index.vue"
import { computed, onMounted, ref } from 'vue'

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

const dialogVisiable = ref(false)
const dialogOption = ref<DialogueData>()
function clickSpriteEvent() {
  if (dialogVisiable.value) {
    return
  }
  dialogOption.value = chatService.getDialogue()
  dialogVisiable.value = true
}

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
function dialogConfirmEvent(option: DialogueOption) {
  // TODO handler event
  if (option.event === 'favorUp') {
    props.data.adventureData.attribution.favor = Math.min(props.data.adventureData.attribution.favor + option.payload![0], 100)
  } else if (option.event === 'favorDown') {
    props.data.adventureData.attribution.favor = Math.max(props.data.adventureData.attribution.favor - option.payload![0], 0)
  } else if (option.event === 'healthUp') {
    props.data.adventureData.attribution.health = Math.min(props.data.adventureData.attribution.health + option.payload![0], 100)
  } else if (option.event === 'healthDown') {
    props.data.adventureData.attribution.health = Math.max(props.data.adventureData.attribution.health - option.payload![0], 0)
  }
}

onMounted(() => {
  model.value && preloadImage.batchPreload(extractSpriteImageSrc(model.value))
})
</script>

<template>
  <div
    class="sprite-main relative"
    :style="{
      transform: `translate(${spriteState.transformX}px, ${spriteState.transformY}px)`,
    }"
    @mouseenter="mouseEnterEvent"
    @mouseleave="mouseLeaveEvent"
  >
    <sprite-image
      v-if="model"
      :frame="model.sprites[spriteState.state].frame"
      :src="model.sprites[spriteState.state].src"
      :style="{
        transform: `scaleX(${spriteState.flip ? -1 : 1})`,
      }"
      @click="clickSpriteEvent"
    />
    <state-bar v-if="data.stateBarVisiable" :option="data.adventureData.attribution"></state-bar>
    <dialog-box
      v-model="dialogVisiable"
      :option="dialogOption!"
      @confirm="dialogConfirmEvent"  
    ></dialog-box>
  </div>
</template>