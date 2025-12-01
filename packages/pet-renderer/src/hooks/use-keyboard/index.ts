import { onMounted, onUnmounted } from "vue"

export function useKeyboard() {
  const keyState: Map<string, boolean> = new Map()

  function keyDownHandler(event: KeyboardEvent) {
    keyState.set(event.code, true)
  }
  function keyUpHandler(event: KeyboardEvent) {
    keyState.set(event.code, false)
  }

  function initWatchKeyboard() {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
  }

  function removeWatchKeyboard() {
    document.removeEventListener('keydown', keyDownHandler)
    document.removeEventListener('keyup', keyUpHandler)
  }

  onMounted(() => {
    initWatchKeyboard()
  })
  onUnmounted(() => {
    removeWatchKeyboard()
  })

  return {
    keyState,
    initWatchKeyboard,
    removeWatchKeyboard
  }
}
