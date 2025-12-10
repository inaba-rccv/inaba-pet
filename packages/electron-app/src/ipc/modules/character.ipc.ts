import { registerIpc, registerIpcInvoke } from "../../libs/ipc-factory.ts"
import { getPrimaryCharacter } from "../../store/index.ts"
import { primaryCharacter } from "../../service/character/index.ts"

export const registerCharacterIPC = () => {
  registerIpcInvoke('character:login', (event) => {
    primaryCharacter.initRenderer(event)
    return
  })

  registerIpcInvoke('character:getInfo', () => {
    return primaryCharacter.getCharacter()
  })
}

