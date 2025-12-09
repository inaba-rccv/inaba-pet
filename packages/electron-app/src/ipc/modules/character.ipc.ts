import { registerIpcInvoke } from "../../libs/ipc-factory.ts"
import { getPrimaryCharacter } from "../../store/index.ts"

export const registerCharacterIPC = () => {
  registerIpcInvoke('character:getInfo', () => {
    return getPrimaryCharacter()
  })
}

