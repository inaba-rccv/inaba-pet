import type { Character } from "@/types/Character";

export function extractSpriteImageSrc(character: Character): string[] {
  return Object.values(character.sprites).map(sprite => sprite.src)
}