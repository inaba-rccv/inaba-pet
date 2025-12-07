import { registerSystemIPC } from './modules/system.ipc.ts'
import { registerBusinessIPC } from './modules/business.ipc.ts'

export const registerIPC = () => {
  registerSystemIPC()
  registerBusinessIPC()
}