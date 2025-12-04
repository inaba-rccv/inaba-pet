import { Item } from "../item"

export interface CharacterAdventureAttribution {
  health: number
  favor: number
  satiety: number
  maxHealth: number
}

export interface AdventureData {
  attribution: CharacterAdventureAttribution
  items: (Item | null)[]
}