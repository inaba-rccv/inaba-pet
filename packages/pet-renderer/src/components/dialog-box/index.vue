<script lang="ts" setup>
import type { DialogueData, DialogueOption } from "@inabapet/types";
import "./index.scss"
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: boolean
  option: DialogueData | undefined
}>(), {
  modelValue: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
  (e: 'confirm', data: DialogueOption): void
}>()
const visiable = computed({
  set: (v: boolean) => emit('update:modelValue', v),
  get: () => props.modelValue
})

function clickConfirmEvent(option: DialogueOption) {
  visiable.value = false
  emit('confirm', option)
}
</script>

<template>
  <ui-uindow v-model="visiable">
    <template #header>Inaba</template>
    <template #default>
      <div class="flex justify-center" style="height: 88px; flex-wrap: wrap;">
        <div class="pd text-center" style="width: 100%; height: 60px; color: var(--ui-color-info);">
          {{ option?.message }}
        </div>
        <div style="">
          <ui-button
            v-for="(item, index) in option?.option"
            :key="index"
            :type="item.type"
            @click="clickConfirmEvent(item)">{{ item.label }}</ui-button>
        </div>
      </div>
    </template>
  </ui-uindow>
</template>