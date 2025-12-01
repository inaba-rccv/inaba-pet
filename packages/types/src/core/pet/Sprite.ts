import type { CharacterAnimationState } from "./Character"

export interface SpriteModelState {
  transformX: number
  transformY: number
  flip: boolean
  state: CharacterAnimationState
}