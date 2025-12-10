import { PackageItem } from "../item/index"
import { AdventureAttribution } from "./Adventure"

export interface DropItem extends PackageItem {
  rate: number // 0-1 掉落率
}

// 图鉴
export interface MonsterAttribution extends AdventureAttribution {
  id: number
  name: string
  dropItems: DropItem[]
}