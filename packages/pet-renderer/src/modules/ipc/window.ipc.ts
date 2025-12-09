import { ipcSend } from "@/utils"

export function moveWindow(dx: number, dy: number) {
  ipcSend('window:move', { dx, dy })
}

export function setMouseIgnore(state: boolean) {
  ipcSend('window:mouse-ignore', { state })
}
