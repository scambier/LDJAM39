/// <reference path="Tile.ts" />

class Building extends Tile {
  static tiles = [5, 6, 7]
  static tileOff = 10
  static allTiles = [5, 6, 7, 10]
  static list: Building[]
  static listOff: Building[]

  static resetAll() {
    Building.list = []
    Building.listOff = []
    for (let x = 0; x < 30; x++) {
      for (let y = 0; y < 17; y++) {
        const tile = Building.allTiles.indexOf(mget(x, y))
        if (tile > -1) {
          const building = new Building(x, y)
          Building.list.push(building)
          mset(building.x, building.y, randomItem([5, 6, 7]))
        }
      }
    }
    return Building.list
  }

  /**
   * Start the timer that will periodically shut down a building tile
   */
  static manageAll() {

    if (Math.random() > .5) {
      Building.randomShutdown()
    }
    wait(Building.manageAll, 1000)
  }

  static randomShutdown() {
    if (!Building.listOff) {
      Building.listOff = []
    }

    // Count incidents
    let incidents = 0
    Generator.list.forEach(gen => {
      if (gen.failure) {
        ++incidents
      }
    })

    // Lights off
    const perc = .5 + (1 / 18) * incidents
    if (incidents > 0) {
      if (Math.random() < perc) {
        // Take a building from our list
        // and shut it down
        Building.turnRandomBuildOff()
      }
    }

    // Lights on
    if (Math.random() < (1 - perc/2)) {
      Building.turnRandomBuildOn()
    }
  }

  static turnRandomBuildOff() {
    if (Building.list.length > 0) {
      const building: Building = randomItem(Building.list)
      if (building) building.turnOff()
    }
  }

  static turnRandomBuildOn() {
    const building: Building = randomItem(Building.listOff)
    if (building) building.turnOn()
  }

  turnOff() {
    remove(Building.list, this)
    Building.listOff.push(this)
    mset(this.x, this.y, 10)

    if (Building.list.length == 0) {
      gameover(false)

    }
  }

  turnOn() {
    if (GAMEOVER) {
      return
    }
    remove(Building.listOff, this)
    Building.list.push(this)
    mset(this.x, this.y, randomItem([5, 6, 7]))
  }
}