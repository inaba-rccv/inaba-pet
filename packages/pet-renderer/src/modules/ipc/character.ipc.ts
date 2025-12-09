import { ipcInvoke } from "@/utils";

export async function getCharacterInfo() {
  return await ipcInvoke('character:getInfo', void 0)
}
