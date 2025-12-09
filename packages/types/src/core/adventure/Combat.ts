export type CombatUnitAttribution = {
  id: string
  name: string
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
} & (
  | {
    type: 'monster',
    monsterId: number
  }
  | {
    type: 'character'
  }
)

export interface CombatUnit {
  attribution: CombatUnitAttribution
  target: CombatUnitAttribution
}

export interface CombatOption {
  combatUnit: [CombatUnitAttribution, CombatUnitAttribution]
  callback: (event: 'state', value: CombatState) => void
}

export interface BehaviorRecord {
  from: CombatUnitAttribution
  to: CombatUnitAttribution
  behavior: Behavior
  damage: number
}

export type Behavior = 'attack'

export type CombatState = 'waiting' | 'finished' | 'stop'