<template>
  <div class="canvas-container">
    <div class="draw-board">
      <sprite
        :model="InabaCharacter"
        :state="spriteState.state"
        :transformX="spriteState.transformX"
        :transformY="spriteState.transformY"
        :flip="spriteState.flip"
      ></sprite>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.scss"
import Sprite from "@/components/sprite/index.vue"
import { onMounted } from "vue"
import { useKeyboard } from "@/hooks/use-keyboard"
import { preloadImage } from "@/utils/index"
import { InabaCharacter } from "@/models/index"
import { extractSpriteImageSrc } from "@/utils/src/tools"
import { useSprite } from "@/hooks/use-sprite"

const { keyState } = useKeyboard()
const { spriteState } = useSprite(keyState)


onMounted(() => {
  preloadImage.batchPreload(extractSpriteImageSrc(InabaCharacter))
})
</script>
