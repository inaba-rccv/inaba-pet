import type { AdventureEventEffect, CharacterInstance, CharacterState, IpcListnerMap, PackageItem } from "@inabapet/types"
import { Adventure } from "../../cores/index.ts"
import { getPrimaryCharacter, setPrimaryCharacter } from "../../store/index.ts"
import { backpackInstance } from "./backpack.ts"

class PrimaryCharacter {
  private character: CharacterInstance
  private characterState: CharacterState = 'nothing'
  private renderer: Electron.IpcMainInvokeEvent | null = null // 客户端

  private adventure: Adventure | null = null
  constructor() {
    this.character = getPrimaryCharacter()
  }

  initRenderer(renderer: Electron.IpcMainInvokeEvent) {
    this.renderer = renderer
  }

  getCharacter() {
    return this.character
  }

  goAdventure() {
    if (this.characterState === 'nothing') {
      this.characterState = 'adventure'
      // this.adventure?.destory() // TODO 如果逻辑完整 应该不需要这个防御性调用？
      this.adventure = new Adventure({
        character: this.character,
        callback: (event, payload) => {
          if (event === 'state' && payload === 'finished') {
            this.handleEffects(this.adventure?.getEffects())
            this.characterState = 'nothing'
          }
          this.send('adventure:event', {
            event, payload
          })
        }
      })
      this.adventure.start()
    }
  }

  handleEffects(effects: AdventureEventEffect[] = []) {
    const spoils: PackageItem[] = []
    effects.forEach(effect => {
      if (effect.type === 'attribution') {
        this.character.adventureData.attribution[effect.attribution] -= effect.value
      } else if (effect.type === 'bonus') {
        spoils.push({
          itemId: effect.itemId,
          count: effect.itemCount
        })
      }
    })
    this.character.adventureData.items = backpackInstance.handleItems(this.character.adventureData.items, spoils)
    this.saveCache()
  }

  private saveCache() {
    setPrimaryCharacter(this.character)
  }

  // TODO payload类型校验
  private send<K extends keyof IpcListnerMap>(channel: K, payload: any) {
    this.renderer?.sender.send(channel, payload)
  }

}

export const primaryCharacter = new PrimaryCharacter()