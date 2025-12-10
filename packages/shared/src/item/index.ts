import { ItemData } from "@inabapet/types";

export const itemGuide: ItemData[] = [
  {
    id: 1001,
    name: 'leather_shoes',
    alias: '精致的小皮鞋',
    type: 'equipment',
    usable: false,
    stackable: false,
    description: '一双精致的小皮鞋',
    events: [
      {
        attribution: 'speed',
        value: 5,
      }
    ]
  }, {
    id: 1,
    name: 'pineapple_bun',
    alias: '菠萝包',
    type: 'consume',
    usable: true,
    stackable: true,
    description: '看上去很好吃！',
    events: [
      {
        attribution: 'health',
        value: 5
      }
    ]
  }
]