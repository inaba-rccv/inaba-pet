import { CharacterAdventureAttribution } from "./Adventure";

export interface AttributionEvent {
  attribution: keyof CharacterAdventureAttribution
  value: number
}