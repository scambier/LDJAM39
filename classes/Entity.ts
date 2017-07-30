class Entity {
  x: number
  y: number
  sprite: number
  flip = false
  moving: Vector2 = {x: 0, y: 0}
  speed = .5
  transparency = 0
  takeable = false

  constructor(x, y, tile, options: { takeable?: boolean } = {}) {
    this.sprite = tile
    this.x = x
    this.y = y

    if (options) {
      this.takeable = options.takeable ? options.takeable : false
    }

    entities.push(this)
  }

  get gx(): number {
    return Math.round((this.x) / 8)
  }

  get gy(): number {
    return Math.round((this.y) / 8)
  }

  get pos(): Vector2 {
    return {x: this.x, y: this.y}
  }

  set pos(pos: Vector2) {
    this.x = pos.x
    this.y = pos.y
  }

  get isMoving(): boolean {
    return this.moving.x != 0 || this.moving.y != 0
  }

  draw(t: number) {
    spr(this.sprite, this.x + camera.x, this.y + camera.y, this.transparency, 1, this.flip)
  }

  update(t) {
    this.x += (this.moving.x * this.speed)
    this.y += (this.moving.y * this.speed)
  }

}