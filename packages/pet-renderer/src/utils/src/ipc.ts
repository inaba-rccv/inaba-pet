import type { IpcInvokeMap, IpcMap } from "@inabapet/types"

const electronApi = window.electronAPI
export const ipcInvoke = <K extends keyof IpcInvokeMap>(
  channel: K,
  payload: IpcInvokeMap[K]['args']
): Promise<IpcInvokeMap[K]['return']> => {
  return electronApi?.invoke(channel, payload)
}

export const ipcSend = <K extends keyof IpcMap>(channel: K, payload: IpcMap[K]) => {
  electronApi?.send(channel, payload)
}