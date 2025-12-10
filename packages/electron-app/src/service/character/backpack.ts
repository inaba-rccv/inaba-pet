import type { ItemData, PackageItem } from "@inabapet/types";
import { itemGuide } from "@inabapet/shared"

class Backpack {
  private itemGuide: Map<number, ItemData>
  constructor() {
    this.itemGuide = new Map(itemGuide.map(item => ([item.id, item])))
  }

  handleItems(backpackItems: (PackageItem | null)[], items: PackageItem[]): (PackageItem | null)[] {
    // TODO 深拷贝优化
    const newBackpackItems = JSON.parse(JSON.stringify(backpackItems)) as (PackageItem | null)[]

    const itemIndexMap = new Map<number, number>() // key为itemID value为道具在当前物品栏的index
    for (let i = backpackItems.length - 1; i >= 0; i--) {
      itemIndexMap.set(backpackItems[i]!.itemId, i)
    }
    items.forEach(item => {
      const itemBackpackIndex = itemIndexMap.get(item.itemId)
      if (itemBackpackIndex !== undefined && this.getItem(item.itemId).stackable) {
        newBackpackItems[itemBackpackIndex]!.count += item.count
      }
      // 放到第一个null的位置
      for (let i = 0; i < newBackpackItems.length; i++) {
        if (newBackpackItems[i] === null) {
          newBackpackItems[i] = item
        }
        break
      }
    })

    return newBackpackItems
  }

  private getItem(itemId: number): ItemData {
    return this.itemGuide.get(itemId)!
  }
}

export const backpackInstance = new Backpack()