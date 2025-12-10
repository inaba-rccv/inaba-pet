import { AttributionEvent } from "../adventure/Event"

export type ItemType = 'equipment' | 'consume' | 'other'
export interface ItemData {
  id: number // primary
  name: string // primary
  alias: string
  description: string
  type: ItemType
  usable: boolean
  stackable: boolean
  events: AttributionEvent[]
}

export interface EquipmentItem {
  itemId: number
}

export interface PackageItem {
  itemId: number
  count: number
}