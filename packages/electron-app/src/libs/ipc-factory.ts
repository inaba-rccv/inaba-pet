import { ipcMain, type IpcMainEvent, type IpcMainInvokeEvent } from 'electron'
import type { IpcInvokeMap, IpcMap } from '@inabapet/types' 

// IPC 注册工厂
export function registerIpc<K extends keyof IpcMap>(
  channel: K,
  handler: (event: IpcMainEvent, payload: IpcMap[K]) => void
) {
  ipcMain.on(channel, (event, payload) => {
    // 类型断言 + TS 类型检查
    handler(event, payload as IpcMap[K])
  })
}

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