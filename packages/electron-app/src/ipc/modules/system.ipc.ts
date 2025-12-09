import { registerIpcInvoke } from "../../libs/ipc-factory.ts"

export const registerSystemIPC = () => {
  registerIpcInvoke('system:getInfo', () => {
    return {
      version: '1.0.0',
      platform: process.platform,
    }
  })
}

