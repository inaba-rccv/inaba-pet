// import { CombatUnitAttribution } from "@inabapet/types"

interface CombatUnitAttribution {
  id: string
  name: string
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
}

interface CombatUnit {
  attribution: CombatUnitAttribution
  target: CombatUnitAttribution
}

interface CombatOption {
  combatUnit: CombatUnitAttribution[]
}

interface BehaviorLog {
  from: CombatUnitAttribution
  to: CombatUnitAttribution
  behavior: Behavior
  damage: number
}

type Behavior = 'attack'

type CombatState = 'waiting' | 'finished'

export class Combat {
  private unit: CombatUnitAttribution[]
  private combatUnits: CombatUnit[] = []
  private winner: CombatUnitAttribution | null = null
  private state: CombatState = 'waiting'
  private behaviorLog: BehaviorLog[] = []

  constructor(option: CombatOption) {
    this.unit = option.combatUnit
  }

  start() {
    this.unit.sort((a, b) => b.speed - a.speed)
    this.combatUnits.push(...[
      {
        attribution: this.unit[0],
        target: this.unit[1]
      },
      {
        attribution: this.unit[1],
        target: this.unit[0]
      }
    ])

    this.onTurn()
  }
  
  getLog() {
    return this.behaviorLog
  }

  private onTurn() {
    for (let unit of this.combatUnits) {
      const damage = Math.max((unit.attribution.attack - unit.target.defense), 0)
      unit.target.health -= Math.min(damage, unit.target.health)
      this.behaviorLog.push({
        from: unit.attribution,
        to: unit.target,
        behavior: 'attack',
        damage: damage
      })
      if (unit.target.health === 0) {
        this.winner = unit.attribution
        return true
      }
    }
    process.nextTick(this.onTurn.bind(this))
  }

  
}