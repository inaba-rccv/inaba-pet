import type { SpriteModelState } from "@inabapet/types" 
import { reactive, ref } from "vue"

export function useSprite(keyState: Map<string, boolean>) {
  const spriteState = reactive<SpriteModelState>({
    transformX: 0,
    transformY: 0,
    flip: false,
    state: 'stand',
  })
  requestAnimationFrame(function update() {
    let dx = 0, dy = 0
    if (keyState.get("ArrowUp")) {
      dy -= 2
    }
    if (keyState.get("ArrowDown")) {
      dy += 2
    }
    if (keyState.get("ArrowLeft")) {
      dx -= 2
      spriteState.flip = false
    }
    if (keyState.get("ArrowRight")) {
      dx += 2
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
    if (dx !== 0 || dy !== 0) {
      window.electronAPI.sendMove({ dx, dy })
    }
    requestAnimationFrame(update)
  })
  return {
    spriteState
  }
}