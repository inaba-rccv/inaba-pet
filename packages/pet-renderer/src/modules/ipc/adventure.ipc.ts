import { ipcSend, ipcWatch } from "@/utils";

export function goAdventure() {
  return ipcSend('adventure:go', void 0)
}

export async function watchAdventureEvent(callback: (_: any, data: any) => void) {
  return ipcWatch('adventure:event', callback)
}