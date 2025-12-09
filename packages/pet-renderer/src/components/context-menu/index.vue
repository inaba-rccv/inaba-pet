<script lang="ts" setup>
import "./index.scss"
import { getSystemInfo } from '@/modules'

function clickDungeonEvent() {
  getSystemInfo().then(res => {
    console.log(res)
  })
}
</script>

<template>
  <div class="context-menu absolute">
    <ui-button type="warning" circle @click="clickDungeonEvent">D</ui-button>
  </div>
</template>