import type { CharacterState } from "./Character"

export interface SpriteState {
  transformX: number
  transformY: number
  flip: boolean
  state: CharacterState
}