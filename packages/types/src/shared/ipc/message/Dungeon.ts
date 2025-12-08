type DungeonLevel = 'easy' | 'normal' | 'difficult'

export interface GoDungeon {
  id: string
  level: DungeonLevel
}

export interface ExitDungeon {}

export type DungeonIpcMap = {
  'dungeon:go': GoDungeon
  'dungeon:exit': ExitDungeon
}
