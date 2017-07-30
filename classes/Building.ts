class Building {
  static tiles = [5, 6, 7]
  static tileOff = 10
  static list: Building[]
  static listOff: Building[]

  x: number
  y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }

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
  static startShutdown() {
    if (Math.random() > .5) {
      Building.randomShutdown()
    }
    wait(Building.startShutdown, 1000)
  }

  static randomShutdown() {
    if (!Building.listOff) {
      Building.listOff = []
    }
    // Take a building from our list
    // and shut it down
    const building: Building = randomItem(Building.list)
    if (building) building.shutdown()
  }

  /**
   * Change the tile and switch the building's list
   */
  shutdown() {
    remove(Building.list, this)
    Building.listOff.push(this)
    mset(this.x, this.y, 10)
  }
}