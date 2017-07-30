/// <reference path="Tile.ts" />
/// <reference path="Entity.ts" />

class Generator extends Tile {
  static list: Generator[]
  static tiles = [16, 17, 32, 33]

  failure: Entity

  static countFailures() {
    let i = 0
    Generator.list.forEach(gen => {
      if (gen.failure) {
        ++i
      }
    })
    return i
  }

  static resetAll() {
    if (this.list) {
      this.list.forEach(item => {
        item.failure = null
      })
    }
    this.findAll()
  }

  static startFailures() {
    const rnd = Math.random()

    if (Generator.countFailures() == 0 && Math.random() < .25) {
      Generator.startRandomFailure(randomItem([FIRE, SPARKS]))
    } else {
      if (rnd < .15) {
        Generator.startRandomFailure(FIRE)
      } else if (rnd < .25) {
        Generator.startRandomFailure(SPARKS)
      }
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