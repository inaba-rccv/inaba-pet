<script lang="ts" setup>
import "./index.scss"
import { computed } from "vue";
import type { CharacterAttribution } from '@inabapet/types'
import PercentBar from "@/components/percent-bar/index.vue"

const props = withDefaults(defineProps<{
  option: CharacterAttribution
}>(), {})

const hpPercent = computed(() => props.option.health + '%')
</script>

<template>
  <div class="state-bar">
    <percent-bar
      inner-color="var(--ui-color-warning)"
      state-title="好感度"
      :max-value="100"
      :value="option.favor"
    ></percent-bar>
    <percent-bar
      inner-color="var(--ui-color-primary)"
      state-title="生命值"
      :max-value="100"
      :value="option.health"
    ></percent-bar>
  </div>

</template>