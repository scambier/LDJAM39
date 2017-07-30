/// <reference path="Tile.ts" />
/// <reference path="Entity.ts" />

class Generator extends Tile {
  static tiles = [16, 17, 32, 33]

  failing: Entity

  static startFailures() {
    if (Math.random() > .5) {
      Generator.randomFailure()
    }
    wait(Generator.startFailures, 1000)
  }

  static randomFailure() {
    const generator: Generator = randomItem(Generator.list)
    if (generator) generator.fail()
  }

  static startRandomFire() {
    trace(Generator.list.length)
    const generator: Generator = randomItem(Generator.list)
    generator.failing = new Fire(generator.x * 8, generator.y * 8)
  }

  fail() {
    this.failing = new Fire(this.x * 8, this.y * 8)
  }


}