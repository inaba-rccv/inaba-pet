import { AttributionEvent } from "../adventure/Event"

export type ItemType = 'equipment' | 'consume' | 'other'
export interface ItemData {
  id: number
  name: string
  description: string
  type: ItemType
  usable?: boolean
  events?: AttributionEvent[]
}

export interface PackageItem {
  itemId: number
  count: number
}