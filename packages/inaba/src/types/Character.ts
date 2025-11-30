export type CharacterState = 'stand' | 'walk'

export interface Character {
  name: string;
  sprites: {
    [key in CharacterState]: {
      src: string;
      frame: number;
    } // key is the action (e.g., 'walk', 'stand'), value is the image path
  }
}