import { useCharacterStore } from "@/stores/character"
import type { CharacterInstance } from "@inabapet/types"
import { getCharacterInfo, login } from "../ipc"
// 在这里挂载全局对象
const init = async (app: any) => {
  const { setCharacter } = useCharacterStore()
  await login()
  const characterInstance = await getCharacterInfo() as CharacterInstance
  setCharacter(characterInstance)

  // app.prototype.$
}

export const appInit = {
	install: init
}