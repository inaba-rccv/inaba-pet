import type { CharacterAdventureAttribution } from "@inabapet/types";

export class CharacterModule {
  constructor(
    private state: CharacterAdventureAttribution
  ) {}

  setAttribution(attr: CharacterAdventureAttribution) {
    this.state = attr
  }

  getAttribution() {
    return this.state
  }

  
}