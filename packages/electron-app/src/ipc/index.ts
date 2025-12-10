import { registerAdventureIPC } from './modules/adventure.ipc.ts'
import { registerCharacterIPC } from './modules/character.ipc.ts'
import { registerSystemIPC } from './modules/system.ipc.ts'
import { registerWindowIPC } from './modules/window.ipc.ts'

export const registerIPC = () => {
  registerSystemIPC()
  registerWindowIPC()
  registerCharacterIPC()
  registerAdventureIPC()
}