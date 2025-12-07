import type { IpcMap } from "@inabapet/types"

const electronApi = window.electronAPI

export const ipcSend = <K extends keyof IpcMap>(channel: K, payload: IpcMap[K]) => {
  electronApi?.send(channel, payload)
}

export function moveWindow(dx: number, dy: number) {
  ipcSend('move-window', { dx, dy })
}

export function setMouseIgnore(state: boolean) {
  ipcSend('mouse-ignore', { state })
}