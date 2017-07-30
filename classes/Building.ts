/// <reference path="Tile.ts" />

class Building extends Tile {
  static tiles = [5, 6, 7]
  static tileOff = 10
  static list: Building[]
  static listOff: Building[]

  static findAll() {
    Building.list = []
    for (let x = 0; x < 30; x++) {
      for (let y = 0; y < 17; y++) {
        const tile = Building.tiles.indexOf(mget(x, y))
        if (tile > -1) {
          Building.list.push(new Building(x, y))
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
        const building: Building = randomItem(Building.list)
        if (building) building.turnOff()
      }
    }

    // Lights on
    if (Math.random() < (1 - perc)) {
      const building: Building = randomItem(Building.listOff)
      if (building) building.turnOn()
    }
  }

  /**
   * Change the tile and switch the building's list
   */
  turnOff() {
    remove(Building.list, this)
    Building.listOff.push(this)
    mset(this.x, this.y, 10)
  }

  turnOn() {
    remove(Building.listOff, this)
    Building.list.push(this)
    mset(this.x, this.y, randomItem([5, 6, 7]))
  }
}