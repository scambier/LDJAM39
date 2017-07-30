/// <reference path="Tile.ts" />
/// <reference path="Entity.ts" />

class Generator extends Tile {
  static list: Generator[]
  static tiles = [16, 17, 32, 33]

  failure: Entity

  static startFailures() {
    if (Math.random() < .2) {
      Generator.startRandomFire()
    }
    wait(Generator.startFailures, 1000)
  }

  // static randomFailure() {
  //   const generator: Generator = randomItem(Generator.list)
  //   if (generator) generator.fail()
  // }

  static startRandomFire() {
    const generator: Generator = randomItem(Generator.list)
    generator.failure = new Fire(generator.x * 8, generator.y * 8)
  }

  fail() {
    this.failure = new Fire(this.x * 8, this.y * 8)
  }

}