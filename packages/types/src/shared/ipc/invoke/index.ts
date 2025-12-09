import { CharacterInstance } from "src/core"

export interface IpcInvokeMap {
  'system:getInfo': {
    args: void
    return: {
      version: string,
      platform: string,
    }
  }

  'character:getInfo': {
    args: void
    return: CharacterInstance
  }
}