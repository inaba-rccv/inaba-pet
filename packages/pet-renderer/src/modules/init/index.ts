import { useCharacterStore } from "@/stores/character"
// 在这里挂载全局对象
const init = (app: any) => {
  const { setCharacter } = useCharacterStore()
  setCharacter('971b0138-911c-4863-58c4-59057ba8f1f3', {
    id: '971b0138-911c-4863-58c4-59057ba8f1f3',
    name: 'inaba',
    isPrimary: true,
    stateBarVisiable: true,
    adventureData: {
      attribution: {
        favor: 5,
        health: 100,
        satiety: 100,
        maxHealth: 100
      },
      items: []
    }
  })
}

export const appInit = {
	install: init
}