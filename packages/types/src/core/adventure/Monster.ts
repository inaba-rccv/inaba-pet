import { PackageItem } from "../item"

export interface DropItem extends PackageItem {
  rate: number // 0-1 掉落率
}

export interface MonsterAttribution {
  id: number
  name: string
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
  dropItems: DropItem[]
}