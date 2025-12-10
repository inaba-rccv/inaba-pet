import type { AdventureCallbackEventType, AdventureEvent, AdventureEventEffect, AdventureOption, AdventureState, CharacterAdventureAttribution, CharacterInstance, CombatUnitAttribution, ItemData, MonsterAttribution, PackageItem, StepAdventureEvent } from "@inabapet/types"
import { Combat } from "./combat.ts"


export class Adventure {
  private eventInterval: NodeJS.Timeout | null = null
  private tick = 2 * 1000 // 事件间隔

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
        count: 2
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
        itemId: 1001,
        count: 1
      }]
    }
  ]
  private readonly events: AdventureEvent[] = [
    { type: 'combat', weight: 3, target: { monsterId: 1 } },
    { type: 'combat', weight: 2, target: { monsterId: 2 } },
    { type: 'normal', weight: 1, message: '遇到了一只可爱的猫猫，感觉被治愈了。', effects: [{
      type: 'attribution',
      attribution: 'health',
      isBenefit: true,
      value: 5
    }] },
    { type: 'normal', weight: 1, message: '被什么东西绊倒了', effects: [{
      type: 'bonus',
      itemId: 1,
      itemCount: 1
    }] },
    { type: 'normal', weight: 1, message: '与野人鏖战了一个小时，被耍的团团转', effects: [] },
    { type: 'normal', weight: 1, message: '找到一处可以休息的营地', effects: [{
      type: 'attribution',
      attribution: 'health',
      isBenefit: true,
      value: 5
    }] },
    { type: 'normal', weight: 1, message: '踩到了一坨答辩', effects: [{
      type: 'attribution',
      attribution: 'health',
      isBenefit: true,
      value: -5
    }] }
  ]

  private totalStep = 5 // 
  private step = 0
  private totalWeight = 0
  private eventWeightBox: number[] = []
  private stepEvents: StepAdventureEvent[] = []
  private character: CharacterInstance
  private characterAdventureAttribution: CharacterAdventureAttribution // 深拷贝后的主角战斗数据
  private state: AdventureState = 'pending'
  // 战利品
  private spoilsItems: PackageItem[] = []

  // TODO 精细化这里的回调函数
  private callback

  constructor(option: AdventureOption) {
    this.character = option.character
    this.characterAdventureAttribution = JSON.parse(JSON.stringify(this.character.adventureData.attribution))
    this.callback = option.callback

    this.totalWeight = this.events.reduce((acc, value) => {
      return acc + value.weight
    }, 0)
    this.eventWeightBox.push(...this.events.map(event => event.weight))
  }

  start() {
    this.eventInterval = setTimeout(() => {
      this.changeState('process')
      this.onTurn()
    }, this.tick)
  }

  destory() {
    if (this.eventInterval) {
      clearInterval(this.eventInterval)
    }
  }

  getEffects(): AdventureEventEffect[] {
    // 只有存活才能带走战利品
    const effects: AdventureEventEffect[] = []
    effects.push({
      type: 'attribution',
      attribution: 'health',
      isBenefit: false,
      value: this.character.adventureData.attribution.health - this.characterAdventureAttribution.health
    })
    if (this.checkSurvive()) {
      effects.push(...this.spoilsItems.map(item => ({
        type: 'bonus',
        itemId: item.itemId,
        itemCount: item.count
      }) as AdventureEventEffect ))
    }
    return effects
  }

  private checkSurvive(): boolean {
    return this.characterAdventureAttribution.health > 0
  }

  private pushEvent(event: StepAdventureEvent): void {
    this.callback('event', event)
    this.stepEvents.push(event)
  }

  private changeState(state: AdventureState): void {
    this.callback('state', state)
    this.state = state
  }

  private getRandomEvent(): AdventureEvent {
    let randomNumber = Math.floor(Math.random() * this.totalWeight)
    let eventIndex = 0
    for (let i = 0; i < this.eventWeightBox.length; i++) {
      if (randomNumber < this.eventWeightBox[i]) {
        eventIndex = i
        break
      }
      randomNumber -= this.eventWeightBox[i]
    }
    return this.events[eventIndex]
  }

  private async onTurn() {
    const event = this.getRandomEvent()
    this.step += 1
    if (event.type === 'normal') {
      this.pushEvent({
        ...event,
        resultEffects: event.effects ? event.effects : [] // 可能需要处理 比如HP小于0的情况
      })
      if (this.characterAdventureAttribution.health === 0) {
        this.changeState('finished')
        return
      }
    } else if (event.type === 'combat') {
      const combatEffects = await this.processCombat({
        ...this.findMonster(event.target.monsterId)!,
        type: 'monster',
        monsterId: event.target.monsterId,
        id: String(event.target.monsterId)
      })
      // 处理战斗effects
      combatEffects.forEach((effect) => {
        if (effect.type === 'attribution') {
          this.characterAdventureAttribution[effect.attribution] -= effect.value
        } else if (effect.type === 'bonus') {
          // TODO 堆叠战利品
          this.spoilsItems.push({
            itemId: effect.itemId,
            count: effect.itemCount
          })
        }
      })
      this.pushEvent({
        ...event,
        resultEffects: combatEffects
      })
      if (this.characterAdventureAttribution.health === 0) {
        this.changeState('finished')
        return
      }
    }
    if (this.step === this.totalStep) {
      this.changeState('finished')
      return
    }

    this.eventInterval = setTimeout(this.onTurn.bind(this), this.tick)
  }

  private findMonster(monsterId: number) {
    return this.monsters.find(monster => monster.id === monsterId)
  }

  private async processCombat(combatUnit: CombatUnitAttribution): Promise<AdventureEventEffect[]> {
    return new Promise((resolve) => {
      const combat = new Combat({
        combatUnit: [
          {
            id: this.character.id,
            type: 'character',
            name: this.character.name,
            ...this.characterAdventureAttribution
          },
          combatUnit
        ],
        callback: (event, value) => {
          if (event === 'state' && value === 'finished') {
            resolve(combat.getEffects(this.character.id)!)
          }
        }
      })
      combat.start()
    })
  }
}