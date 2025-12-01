import type { SpriteModelState } from "@inabapet/types"; 
import { reactive, ref } from "vue";

export function useSpriteMovement(keyState: Map<string, boolean>) {
  const spriteState = reactive<SpriteModelState>({
    transformX: 0,
    transformY: 0,
    flip: false,
    state: 'stand',
  })

  requestAnimationFrame(function update() {
    if (keyState.get("ArrowUp")) {
      spriteState.transformY -= 2
    }
    if (keyState.get("ArrowDown")) {
      spriteState.transformY += 2
    }
    if (keyState.get("ArrowLeft")) {
      spriteState.transformX -= 2
      spriteState.flip = false
    }
    if (keyState.get("ArrowRight")) {
      spriteState.transformX += 2
      spriteState.flip = true
    }
    if (
      keyState.get("ArrowUp") ||
      keyState.get("ArrowDown") ||
      keyState.get("ArrowLeft") ||
      keyState.get("ArrowRight")
    ) {
      spriteState.state = 'walk'
    } else {
      spriteState.state = 'stand'
    }
    requestAnimationFrame(update)
  })
  return {
    spriteState,
  }
}