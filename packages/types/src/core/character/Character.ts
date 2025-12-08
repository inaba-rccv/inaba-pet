import { AdventureData } from "../adventure/AdventureData"

export type CharacterAnimationState = 'stand' | 'walk'

export interface CharacterAssets {
  name: string
  sprites: {
    [key in CharacterAnimationState]: {
      src: string
      frame: number
    }
  }
}
export interface CharacterInstance {
  id: string
  name: string
  adventureData: AdventureData
  isPrimary: boolean
  stateBarVisiable: boolean
}