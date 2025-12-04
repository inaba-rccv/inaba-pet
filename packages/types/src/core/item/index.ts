import { AttributionEvent } from "../adventure/Event"

export interface Item {
  id: string
  name: string
  description: string
  usable: boolean
  event: AttributionEvent
}