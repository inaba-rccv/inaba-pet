import { CharacterAdventureData } from "../adventure/Adventure"

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

export type CharacterState = 'nothing' | 'adventure'

export interface CharacterInstance {
  id: string
  name: string
  adventureData: CharacterAdventureData
}