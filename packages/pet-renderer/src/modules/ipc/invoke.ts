import type { IpcInvokeMap } from "@inabapet/types"

const electronApi = window.electronAPI
const ipcInvoke = <K extends keyof IpcInvokeMap>(
  channel: K,
  payload: IpcInvokeMap[K]['args']
): Promise<IpcInvokeMap[K]['return']> => {
  return electronApi?.invoke(channel, payload)
}

export function getSystemInfo() {
  return ipcInvoke('system:getInfo', void 0)
}