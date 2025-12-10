import { ipcInvoke } from "@/utils";

export async function login() {
  return await ipcInvoke('character:login', void 0)
}

export async function getCharacterInfo() {
  return await ipcInvoke('character:getInfo', void 0)
}
