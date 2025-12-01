import type { CharacterAssets } from "@inabapet/types" 

export function extractSpriteImageSrc(character: CharacterAssets): string[] {
  return Object.values(character.sprites).map(sprite => sprite.src)
}