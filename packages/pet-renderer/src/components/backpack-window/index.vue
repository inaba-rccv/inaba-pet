<script lang="ts" setup>
import type { ItemData, PackageItem } from "@inabapet/types";
import "./index.scss"

const itemGuideMap = new Map<number, ItemData>(
  [
    [1001, {
      id: 1001,
      name: 'leather_shoes',
      alias: '精致的小皮鞋',
      type: 'other',
      usable: false,
      stackable: false,
      description: '一双精致的小皮鞋',
      events: [
        {
          attribution: 'speed',
          value: 5,
        }
      ]
    }],
    [1, {
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
    }]
  ]
)
const props = withDefaults(defineProps<{
  packageItems: (PackageItem | null)[]
}>(), {})
</script>

<template>
  <div class="backpack absolute grid">
    <div class="itembox" v-for="item in packageItems">
      <img v-if="item" :src="`assets/item/${itemGuideMap.get(item.itemId)?.name}.png`" style="width: 100%; height: 100%;" alt="">
      <span class="item--count" v-if="item && item.count !== 1" >{{ item.count }}</span>
    </div>
  </div>
</template>