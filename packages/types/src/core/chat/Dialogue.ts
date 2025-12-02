import { ThemeColorType } from "../../shared"
import { PetEvent } from "../event/PetEvent"

export interface DialogueOption {
  label: string
  type: ThemeColorType
  event?: PetEvent
  payload?: any[]
}

export interface DialogueData {
  message: string
  option: DialogueOption[]
}