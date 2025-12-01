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

export interface CharacterAttribution {
  health: number
  favor: number
  satiety: number
}

export interface CharacterInstance {
  id: string
  name: string
  attribution: CharacterAttribution
  isPrimary: boolean
  stateBarVisiable: boolean
}