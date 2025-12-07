<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue'
import SpriteImage from '@/components/sprite-image/index.vue'
import { useKeyboard } from '@/hooks/use-keyboard'
import { useSprite } from '@/hooks/use-sprite'
import { useSpriteMovement } from '@/hooks/use-sprite-movement'
import { ChatService } from '@/modules'
import { extractSpriteImageSrc, preloadImage } from '@/utils'
import type { CharacterInstance, DialogueData, DialogueOption, SpriteModelState } from '@inabapet/types' 
import StateBar from "@/components/state-bar/index.vue"
import DialogBox from "@/components/dialog-box/index.vue"
import { characterInstanceInjectKey, characterModelInjectKey } from '.'
import ContextMenu from "@/components/context-menu/index.vue"

const characterModel = inject(characterModelInjectKey)
const characterInstance = inject(characterInstanceInjectKey) as CharacterInstance
// 创建精灵
let spriteState: SpriteModelState
const { keyState } = useKeyboard()
if (window.electronAPI) {
  spriteState = useSprite(keyState).spriteState
} else {
  spriteState = useSpriteMovement(keyState).spriteState
}

// 获取模型数据
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

function dialogConfirmEvent(option: DialogueOption) {
  if (option.event === 'favorUp') {
    characterInstance.adventureData.attribution.favor = Math.min(characterInstance.adventureData.attribution.favor + option.payload![0], 100)
  } else if (option.event === 'favorDown') {
    characterInstance.adventureData.attribution.favor = Math.max(characterInstance.adventureData.attribution.favor - option.payload![0], 0)
  } else if (option.event === 'healthUp') {
    characterInstance.adventureData.attribution.health = Math.min(characterInstance.adventureData.attribution.health + option.payload![0], 100)
  } else if (option.event === 'healthDown') {
    characterInstance.adventureData.attribution.health = Math.max(characterInstance.adventureData.attribution.health - option.payload![0], 0)
  }
}

const contextMenuVisiable = ref(false)
function clickContextEvent(e: MouseEvent) {
  e.preventDefault()
  // 切换右键菜单
  contextMenuVisiable.value = !contextMenuVisiable.value
}

onMounted(() => {
  characterModel?.value && preloadImage.batchPreload(extractSpriteImageSrc(characterModel.value))
})
</script>

<template>
  <sprite-image
    v-if="characterModel"
    :frame="characterModel.sprites[spriteState.state].frame"
    :src="characterModel.sprites[spriteState.state].src"
    :flip="spriteState.flip"
    @click="clickSpriteEvent"
    @contextmenu="clickContextEvent"
  />
  <state-bar
    v-show="characterInstance?.stateBarVisiable"
    :option="characterInstance.adventureData.attribution"
  ></state-bar>
  <dialog-box
    v-model="dialogVisiable"
    :option="dialogOption!"
    @confirm="dialogConfirmEvent"  
  ></dialog-box>
  <context-menu v-show="contextMenuVisiable"></context-menu>
</template>