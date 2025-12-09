import { CharacterInstance } from "../character"
import { PackageItem } from "../item"
import { BehaviorRecord } from "./Combat"


export interface CharacterAdventureData {
  attribution: CharacterAdventureAttribution
  items: (PackageItem | null)[]
}

export interface CharacterAdventureAttribution {
  health: number
  favor: number
  satiety: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
}

export type AdventureEventEffect = 
  | {
    type: 'attribution'
    attribution: 'health' // 扩展为根据CharacterAdventureAttribution挑选
    isBenefit: boolean
    value: number
  }
  | {
    type: 'bonus'
    itemId: number
    itemCount: number
  }

export type AdventureEvent = {
  weight: number
} & (
  | AdventureCombatEvent
  | {
    type: 'normal'
    message: string
    effects: AdventureEventEffect[]
  }
)

export type AdventureCombatEvent = {
  type: 'combat'
  target: AdventureEventTarget
}

export interface AdventureEventTarget {
  monsterId: number // TODO 全改string?
}

export type StepAdventureEvent = AdventureEvent & {
  combatRecords?: BehaviorRecord // 实际效果
  resultEffects: AdventureEventEffect[] // 实际效果
}

export interface EventLogs {
  event: AdventureEvent
  message: string
}

export type AdventureState = 'pending' | 'process' | 'finished'
export type AdventureCallbackEventType = 'event' | 'state'

export interface AdventureOption {
  character: CharacterInstance
  callback: (event: AdventureCallbackEventType, args: any) => void
}