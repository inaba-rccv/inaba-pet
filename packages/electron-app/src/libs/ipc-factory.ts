import { ipcMain, type IpcMainEvent, type IpcMainInvokeEvent } from 'electron'
import type { IpcInvokeMap, IpcListnerMap, IpcMap } from '@inabapet/types' 

// IPC 注册工厂
export function registerIpc<K extends keyof IpcMap>(
  channel: K,
  handler: (event: IpcMainEvent, payload: IpcMap[K]) => void
) {
  ipcMain.on(channel, (event, payload) => {
    handler(event, payload as IpcMap[K])
  })
}

/**
 * 
 * @param channel 
 * @param handler 
 */
export function registerIpcInvoke<
  K extends keyof IpcInvokeMap
>(
  channel: K,
  handler: (event: IpcMainInvokeEvent, args: IpcInvokeMap[K]['args']) 
    => Promise<IpcInvokeMap[K]['return']> | IpcInvokeMap[K]['return']
) {
  ipcMain.handle(channel, async (event, args) => {
    return handler(event, args)
  })
}