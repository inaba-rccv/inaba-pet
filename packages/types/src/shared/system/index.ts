export interface ElectronAPI {
  send: (channel: string, data?: any) => void
  invoke: (channel: string, data?: any) => Promise<any>
  on: (channel: string, callback: (data: any) => void) => void
  off: (channel: string, callback: (data: any) => void) => void
}

export interface SystemInfo {
  version: string,
  platform: 'win',
}
