/// <reference types="vite/client" />

import type { ElectronAPI } from "@inabapet/types"


declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}