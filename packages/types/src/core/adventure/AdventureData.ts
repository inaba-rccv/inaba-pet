import { Item } from "../item"

export interface CharacterAdventureAttribution {
  health: number
  favor: number
  satiety: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
}

export interface AdventureData {
  attribution: CharacterAdventureAttribution
  items: (Item | null)[]
}