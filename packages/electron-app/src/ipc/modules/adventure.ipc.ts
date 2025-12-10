import { primaryCharacter } from "../../service/character/index.ts"
import { registerIpc } from "../../libs/ipc-factory.ts"

export const registerAdventureIPC = () => {
  registerIpc('adventure:go', () => {
    primaryCharacter.goAdventure()
  })

}

