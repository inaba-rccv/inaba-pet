<template>
  <div class="canvas-container">
    <div class="draw-board">
      <sprite
        :model="InabaCharacter"
        :state="spriteState.state"
        :transformX="spriteState.transformX"
        :transformY="spriteState.transformY"
        :flip="spriteState.flip"
        @click="clickSpriteEvent"
      ></sprite>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss"
import Sprite from "@/components/sprite/index.vue"
import { onMounted, reactive } from "vue"
import { useKeyboard } from "@/hooks/use-keyboard"
import { preloadImage } from "@/utils/index"
import { InabaCharacter } from "@/models/index"
import { extractSpriteImageSrc } from "@/utils/src/tools"
import { useSprite } from "@/hooks/use-sprite"
import { useSpriteMovement } from "@/hooks/use-sprite-movement"
import { getCurrentInstance } from 'vue'
import type { SpriteState } from "@inaba-pet/types"

const instance = getCurrentInstance()
const { $MessageBox } = instance!.appContext.config.globalProperties

const { keyState } = useKeyboard()
let spriteState: SpriteState
if (window.electronAPI) {
  spriteState = useSprite(keyState).spriteState
} else {
  spriteState = useSpriteMovement(keyState).spriteState
}

function clickSpriteEvent() {
  // $MessageBox.confirm({
  //   title: "Inaba",
  //   message: "你点你*呢？",
  //   x: -200,
  //   y: 0,
  //   draggable: false,
  // })
}

onMounted(() => {
  preloadImage.batchPreload(extractSpriteImageSrc(InabaCharacter))
})
</script>

<style lang="scss" scoped>
</style>