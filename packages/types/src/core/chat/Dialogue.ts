import { ThemeColorType } from "../../shared"
import { AttributionEvent } from "../adventure/Event"

export interface DialogueOption {
  label: string
  type: ThemeColorType
  event: AttributionEvent[]
  payload?: any[]
}

export interface DialogueData {
  message: string
  option: DialogueOption[]
}