import type { CombatUnitAttribution, CombatUnit, CombatOption, BehaviorRecord, CombatState, AdventureEventEffect, MonsterAttribution, PackageItem } from "@inabapet/types"

export class Combat {
  private readonly monsters: MonsterAttribution[] = [
    {
      id: 1,
      name: '史莱姆',
      health: 20,
      maxHealth: 20,
      attack: 3,
      defense: 0,
      speed: 1,
      dropItems: [{
        rate: 1,
        itemId: 1,
        count: 1
      }]
    },
    {
      id: 2,
      name: '红色史莱姆',
      health: 20,
      maxHealth: 20,
      attack: 5,
      defense: 0,
      speed: 1,
      dropItems: [{
        rate: 1,
        itemId: 2,
        count: 2
      }]
    }
  ]
  private originUnits: CombatUnitAttribution[]
  private unit: CombatUnitAttribution[]
  private combatUnits: [CombatUnit, CombatUnit]
  private winner: CombatUnitAttribution | null = null
  private state: CombatState = 'waiting'
  private behaviorRecord: BehaviorRecord[] = []
  private callback: (event: "state", value: CombatState) => void

  constructor(option: CombatOption) {
    // 不能有副作用
    this.originUnits = option.combatUnit
    this.unit = JSON.parse(JSON.stringify(option.combatUnit)) // TODO 深拷贝优化
    this.callback = option.callback
    this.unit.sort((a, b) => b.speed - a.speed)
    this.combatUnits = [
      {
        attribution: this.unit[0],
        target: this.unit[1]
      },
      {
        attribution: this.unit[1],
        target: this.unit[0]
      }
    ]
  }

  start() {
    this.onTurn()
  }
  
  distory() {
    this.state = 'stop'
  }

  getRecord() {
    return this.behaviorRecord
  }

  getWinner() {
    return this.winner
  }

  getEffects(id: string): AdventureEventEffect[] {
    if (this.state !== 'finished') {
      return []
    }
    const originUnit = this.originUnits.find(unit => unit.id === id)
    const finnalUnit = this.unit.find(unit => unit.id === id)
    if (!originUnit || !finnalUnit) {
      return []
    }
    const result: AdventureEventEffect[] = [{
      type: 'attribution',
      attribution: 'health',
      isBenefit: false,
      value: originUnit.health - finnalUnit.health
    }]

    // 只有胜利才进行战利品结算
    if (id === this.winner!.id) {
      const target = this.combatUnits.find(unit => unit.attribution.id === id)!.target
      if (target.type === 'monster') {
        const spoilsItems: AdventureEventEffect[] = this.getSpoilsItems(target.monsterId).map(item => {
          return {
            type: 'bonus',
            itemId: item.itemId,
            itemCount: item.count
          }
        })
        result.push(...spoilsItems)
      }
    }
    return result
  }

  private onTurn() {
    for (let unit of this.combatUnits) {
      const damage = Math.max((unit.attribution.attack - unit.target.defense), 0)
      unit.target.health -= Math.min(damage, unit.target.health)
      this.behaviorRecord.push({
        from: unit.attribution,
        to: unit.target,
        behavior: 'attack',
        damage: damage
      })
      if (unit.target.health === 0) {
        this.winner = unit.attribution
        this.changeState('finished')
        return true
      }
    }
    if (this.state !==  'stop') {
      process.nextTick(this.onTurn.bind(this))
    }
  }

  private changeState(state: CombatState) {
    this.state = state
    this.callback('state', state)
  }

  private getSpoilsItems(monsterId: number): PackageItem[] {
    const spoilsItems: PackageItem[] = []
    const dropItems = this.monsters.find(monster => monster.id === monsterId)!.dropItems
    dropItems.forEach((dropItem) => {
      if (Math.random() < dropItem.rate) {
        spoilsItems.push({
          itemId: dropItem.itemId,
          count: dropItem.count
        })
      }
    })
    return spoilsItems
  }

}