class Entity {
  x: number
  y: number
  sprite: number
  flip = false
  moving: Vector2 = {x: 0, y: 0}
  speed = .5
  transparency = 0

  constructor(gx, gy, tile) {

    this.sprite = tile

    this.x = gx * 8
    this.y = gy * 8
  }

  get gx(): number {
    return Math.round((this.x) / 8)
  }

  get gy(): number {
    return Math.round((this.y) / 8)
  }

  get isMoving(): boolean {
    return this.moving.x != 0 || this.moving.y != 0
  }

  draw() {
    let
      x = Math.round(this.x),
      y = Math.round(this.y),
      hopHor = x % 6 == 0 || x % 6 == 1,
      hopVer = y % 10 >= 0 && y % 10 < 5

    y += hopHor ? 1 : 0
    x += hopVer ? 0 : 1

    spr(this.sprite, x + camera.x, y + camera.y, this.transparency, 1, this.flip)
  }

  update(t) {
    this.x += (this.moving.x * this.speed)
    this.y += (this.moving.y * this.speed)
  }

  moveTo(vect: Vector2): void {

    let
      nextX = this.x + vect.x + vect.x * 3,
      nextY = this.y + vect.y + vect.y * 3,
      gx = Math.round(nextX / 8),
      gy = Math.round(nextY / 8)


    if (COLLIDES.indexOf(mget(gx, gy)) > -1) {
      this.moving = {x: 0, y: 0}
      return
    }

    this.moving = {x: vect.x, y: vect.y}
    if (vect.x == -1) this.flip = false
    if (vect.x == 1) this.flip = true
  }
}