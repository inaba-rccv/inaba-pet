import { useCharacterStore } from "@/stores/character"
import { getCharacterInfo } from "../ipc/character.ipc"
import type { CharacterInstance } from "@inabapet/types"
// 在这里挂载全局对象
const init = async (app: any) => {
  const { setCharacter } = useCharacterStore()
  const characterInstance = await getCharacterInfo() as CharacterInstance
  setCharacter(characterInstance)
}

export const appInit = {
	install: init
}