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
import BackpackWindow from "@/components/backpack-window/index.vue"

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

function dialogConfirmEvent(option: DialogueOption) {}

const contextMenuVisiable = ref(false)
const windowSwitch = ref({
  backpackVisiable: false
})
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
    :option="characterInstance.adventureData.attribution"
  ></state-bar>
  <dialog-box
    v-model="dialogVisiable"
    :option="dialogOption!"
    @confirm="dialogConfirmEvent"  
  ></dialog-box>
  <context-menu
    v-show="contextMenuVisiable"
    v-model="windowSwitch"  
  ></context-menu>
  <backpack-window
    v-show="windowSwitch.backpackVisiable"
    :package-items="characterInstance.adventureData.items"  
  ></backpack-window>
</template>