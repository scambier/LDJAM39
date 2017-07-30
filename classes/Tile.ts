class Tile {
  static tiles: number[]
  static tileOff: number
  static list: Tile[]

  x: number
  y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static findAll() {
    this.list = []
    for (let x = 0; x < 30; x++) {
      for (let y = 0; y < 17; y++) {
        const tile = this.tiles.indexOf(mget(x, y))
        if (tile > -1) {
          this.list.push(new Tile(x, y))
        }
      }
    }
    return Tile.list
  }
}