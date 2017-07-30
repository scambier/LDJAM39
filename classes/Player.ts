class Player extends Entity {

  holding: Entity

  constructor(x, y) {
    super(x, y, 256)
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
        }
        break
      case WRENCH:
        let sparks: GeneratorFailure = this.findClosest(item => item.sprite == SPARKS, 10)
        if (sparks) {
          spr(t % 30 > 15 ? REPAIR : 0, sparks.x, sparks.y, 0, 1)
          sparks.putDown()
        }
        break
    }
  }

  update(t) {
    super.update(t)
    if (this.holding) {
      this.holding.x = this.x
      this.holding.y = this.y
    }
  }
}