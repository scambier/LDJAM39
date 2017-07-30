class Player extends Entity {

  holding: Entity
  playingSound: boolean
  playingFootsteps: boolean

  constructor(x, y) {
    super(x, y, 256)
    this.playingSound = false
    this.playingFootsteps = false
  }

  findClosest(cb, maxDist = 8) {
    let
      closest = null,
      distance = 1000

    entities.forEach(entity => {
      const dist = distanceBetween(this.pos, entity.pos)
      if (dist < distance && dist <= maxDist && cb(entity)) {
        distance = dist
        closest = entity
      }
    })
    return closest
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

  draw(t: number) {
    let
      x = Math.round(this.x),
      y = Math.round(this.y),
      hopHor = x % 6 == 0 || x % 6 == 1,
      hopVer = y % 6 > 3// && y % 6 < 5

    y += hopHor ? 1 : 0
    x += hopVer ? 0 : 1

    spr(this.sprite, x + camera.x, y + camera.y, this.transparency, 1, this.flip)
  }

  take() {
    if (this.holding) {
      this.drop()
      return
    }

    let closest = this.findClosest(item => item.takeable)

    if (closest) {
      this.holding = closest
    }
  }

  drop() {
    this.holding.y += 2
    this.holding = null
  }

  use() {
    if (!this.holding) {
      return
    }
    switch (this.holding.sprite) {
      case EXTINGUISHER:
        let fire: GeneratorFailure = this.findClosest(item => item.sprite == FIRE, 10)
        if (fire) {
          spr(GAS, fire.x, fire.y, 0, 1, t % 20 > 10)
          fire.putDown()
          this.playSoundGas()
        }
        break
      case WRENCH:
        let sparks: GeneratorFailure = this.findClosest(item => item.sprite == SPARKS, 10)
        if (sparks) {
          spr(t % 30 > 15 ? REPAIR : 0, sparks.x, sparks.y, 0, 1)
          sparks.putDown()
          this.playSoundWrench()
        }
        break
    }
  }

  playSoundWrench() {
    if (!this.playingSound) {
      this.playingSound = true
      sfx(1, 4 * 12 + 6)
      wait(() => this.playingSound = false, 500)
    }
  }

  playSoundGas() {
    if (!this.playingSound) {
      this.playingSound = true
      sfx(0, 3 * 12 + 6, 32)
      wait(() => this.playingSound = false, 500)
    }
  }


  update(t) {
    super.update(t)
    if (this.holding) {
      this.holding.x = this.x
      this.holding.y = this.y
    }

    // if (this.isMoving) {
    //   if (!this.playingFootsteps) {
    //     sfx(2, 2*12)
    //     this.playingFootsteps = true
    //   } else {
    //     this.playingFootsteps = false
    //   }
    // }
  }
}