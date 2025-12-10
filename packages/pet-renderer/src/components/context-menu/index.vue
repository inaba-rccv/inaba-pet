<script lang="ts" setup>
import { goAdventure, watchAdventureEvent } from "@/modules/ipc/adventure.ipc";
import "./index.scss"
import { onMounted, onUnmounted } from "vue";

const props = withDefaults(defineProps<{
  modelValue: {
    backpackVisiable: boolean
  }
}>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', value: { backpackVisiable: boolean }): void
}>()

let off: Function | null
async function clickDungeonEvent() {
  goAdventure()
}

function switchBackpackVisiable() {
  emit('update:modelValue', {
    backpackVisiable: !props.modelValue.backpackVisiable
  })
}

onMounted(async () => {
  off = await watchAdventureEvent((_, data) => {
    console.log(data.event, data.payload)
  })
})

onUnmounted(() => {
  off && off()
})
</script>

<template>
  <div class="context-menu absolute">
    <ui-button type="warning" circle @click="clickDungeonEvent">D</ui-button>
    <ui-button type="danger" circle @click="switchBackpackVisiable">B</ui-button>
  </div>
</template>