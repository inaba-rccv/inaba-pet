export interface MoveWindowPayload {
  dx: number
  dy: number
}

export interface MouseIgnorePayload {
  state: boolean
}

export type IpcMap = {
  'move-window': MoveWindowPayload
  'mouse-ignore': MouseIgnorePayload
}
