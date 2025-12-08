import type { IpcMap } from "@inabapet/types"

const electronApi = window.electronAPI
const ipcSend = <K extends keyof IpcMap>(channel: K, payload: IpcMap[K]) => {
  electronApi?.send(channel, payload)
}

export function moveWindow(dx: number, dy: number) {
  ipcSend('window:move', { dx, dy })
}

export function setMouseIgnore(state: boolean) {
  ipcSend('window:mouse-ignore', { state })
}
