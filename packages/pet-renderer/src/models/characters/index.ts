import type { CharacterAssets } from "@inabapet/types"
import { Inaba } from "./src/InabaModel"

const CharacterModels: Map<string, CharacterAssets> = new Map([
  ['inaba', Inaba]
])

export { CharacterModels }