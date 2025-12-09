import { ipcInvoke } from "@/utils"

export function getSystemInfo() {
  return ipcInvoke('system:getInfo', void 0)
}
