/// <reference path="Tile.ts" />
/// <reference path="Entity.ts" />

class Generator extends Tile {
  static list: Generator[]
  static tiles = [16, 17, 32, 33]

  failure: Entity

  static startFailures() {
    const rnd = Math.random()
    if (rnd < .1) {
      Generator.startRandomFailure(FIRE)
    } else if (rnd < .2) {
      Generator.startRandomFailure(SPARKS)
    }

    wait(Generator.startFailures, 1000)
  }

  // static randomFailure() {
  //   const generator: Generator = randomItem(Generator.list)
  //   if (generator) generator.fail()
  // }

  static startRandomFailure(sprite) {
    const generator: Generator = randomItem(Generator.list)
    if (!generator.failure) {
      generator.failure = new GeneratorFailure(generator.x * 8, generator.y * 8, sprite)
      Building.turnRandomBuildOff()
    }
  }

}