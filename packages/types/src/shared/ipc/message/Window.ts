export interface MovePayload {
  dx: number
  dy: number
}

export interface MouseIgnorePayload {
  state: boolean
}

export type WindowIpcMap = {
  'window:move': MovePayload
  'window:mouse-ignore': MouseIgnorePayload
}
