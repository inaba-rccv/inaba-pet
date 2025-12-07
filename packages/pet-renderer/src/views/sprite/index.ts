import type { CharacterAssets, CharacterInstance } from "@inabapet/types";
import type { ComputedRef, InjectionKey } from "vue";

export const characterModelInjectKey = Symbol() as InjectionKey<ComputedRef<CharacterAssets>>
export const characterInstanceInjectKey = Symbol() as InjectionKey<CharacterInstance>