import { ipcMain } from 'electron'
import type { SystemInfo } from '@inabapet/types'

export const registerSystemIPC = () => {
  ipcMain.handle('system:getInfo', async () => {
    return {
      version: '1.0.0',
      platform: 'win',
    } satisfies SystemInfo
  })
}

