export interface IpcInvokeMap {
  'system:getInfo': {
    args: void
    return: {
      version: string,
      platform: string,
    }
  }
}