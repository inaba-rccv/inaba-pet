import type { AdventureCallbackEventType, AdventureEvent, AdventureEventEffect, AdventureOption, AdventureState, CharacterInstance, CombatUnitAttribution, ItemData, MonsterAttribution, PackageItem, StepAdventureEvent } from "@inabapet/types"
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

  private readonly itemGuideMap = new Map<number, ItemData>(
    [
      [1, {
        id: 1,
        name: '精致的小皮鞋',
        type: 'other',
        usable: false,
        description: '一双精致的小皮鞋',
      }],
      [2, {
        id: 2,
        name: '干瘪的烤面包',
        type: 'consume',
        usable: true,
        description: '看上去很难吃！',
        events: [
          {
            attribution: 'health',
            value: 5
          }
        ]
      }]
    ]
  )

  private totalStep = 20 // 
  private step = 0
  private totalWeight = 0
  private eventWeightBox: number[] = []
  private stepEvents: StepAdventureEvent[] = []
  private character: CharacterInstance
  private state: AdventureState = 'pending'
  // 战利品
  private spoilsItems: PackageItem[] = []

  private callback: (event: AdventureCallbackEventType, ...args: any) => void

  constructor(option: AdventureOption) {
    this.character = option.character
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

  stop() {
    if (this.eventInterval) {
      clearInterval(this.eventInterval)
    }
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
      if (this.character.adventureData.attribution.health === 0) {
        this.changeState('finished')
        return
      }
    } else if (event.type === 'combat') {
      const combatEffects = await this.processCombat({
        ...this.findMonster(event.target.monsterId)!,
        type: 'monster',
        monsterId: event.target.monsterId,
        id: 'dx1Fms3gdEqrfd'
      })
      console.log(`与${event.target.monsterId}进行战斗`)
      // 处理战斗effects
      combatEffects.forEach((effect) => {
        if (effect.type === 'attribution') {
          this.character.adventureData.attribution[effect.attribution] -= effect.value
        } else if (effect.type === 'bonus') {
          this.spoilsItems.push({
            itemId: effect.itemId,
            count: effect.itemCount
          })
          console.log(`获取了${effect.itemCount}${effect.itemId}`)
        }
      })
      this.pushEvent({
        ...event,
        resultEffects: combatEffects
      })
      if (this.character.adventureData.attribution.health === 0) {
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
            ...this.character.adventureData.attribution
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

  // private processEffectText(effects: AdventureEventEffect[]): string {
  //   let text = effects.reduce((acc, effect) => {
  //     if (effect.type === 'attribution') {
  //       if (effect.attribution === 'health') {
  //         acc += (effect.isBenefit ? '恢复了' : '减少了') + effect.value + '点HP'
  //       }
  //     } else if (effect.type === 'bonus') {

  //     }
  //     return acc
  //   }, '')
  //   return text
  // }
}