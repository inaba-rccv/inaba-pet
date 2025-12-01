import type { CharacterAttribution } from "@inabapet/types";

export class CharacterModule {
  constructor(
    private state: CharacterAttribution
  ) {}

  setAttribution(attr: CharacterAttribution) {
    this.state = attr
  }

  getAttribution() {
    return this.state
  }

  
}