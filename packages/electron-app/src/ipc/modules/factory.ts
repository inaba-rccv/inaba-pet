import { ipcMain, type IpcMainEvent } from 'electron'
import type { IpcMap } from '@inabapet/types' 

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