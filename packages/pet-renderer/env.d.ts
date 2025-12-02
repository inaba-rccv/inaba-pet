/// <reference types="vite/client" />

export interface IElectronAPI {
  sendMove: (data: { dx: number; dy: number }) => void;
  setMouseIgnore: (data: { state: boolean }) => void,
  // 添加其他你需要的 API 方法
  onMessage: (callback) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}