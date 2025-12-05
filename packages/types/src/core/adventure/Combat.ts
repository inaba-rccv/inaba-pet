export interface CombatUnitAttribution {
  id: string
  name: string
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
}

export interface CombatUnit {
  attribution: CombatUnitAttribution
  target: CombatUnitAttribution
}

export interface CombatOption {
  combatUnit: CombatUnitAttribution[]
}

export interface BehaviorLog {
  from: CombatUnitAttribution
  to: CombatUnitAttribution
  behavior: Behavior
  damage: number
}

export type Behavior = 'attack'

export type CombatState = 'waiting' | 'finished'