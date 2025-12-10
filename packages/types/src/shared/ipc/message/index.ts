
type DungeonLevel = 'easy' | 'normal' | 'difficult'

// export interface GoDungeon {
//   id: string
//   level: DungeonLevel
// }

export interface MovePayload {
  dx: number
  dy: number
}

export interface MouseIgnorePayload {
  state: boolean
}

export type IpcMap = {
  'adventure:go': void
  'adventure:exit': void
  'window:move': MovePayload
  'window:mouse-ignore': MouseIgnorePayload
}
