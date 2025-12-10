import { CharacterInstance } from "src/core"

export interface IpcInvokeMap {
  'system:getInfo': {
    args: void
    return: {
      version: string,
      platform: string,
    }
  }

  'character:login': {
    args: void
    return: void
  }

  'character:getInfo': {
    args: void
    return: CharacterInstance
  }
}