class GeneratorFailure extends Entity {

  hp: number

  constructor(x, y, sprite) {
    super(x, y, sprite)
    this.hp = randRangeInt(3, 5)
  }

  draw(t) {
    super.draw(t)
    if (this.sprite == FIRE) {
      if (t % 30 == 0) {
        this.flip = !this.flip
      }
    }
    if (this.sprite == SPARKS) {
      if (t % 2 == 0) {
        this.flip = !this.flip
      }
    }
  }

  putDown() {
    this.hp -= 1/30
    if (this.hp <= 0) {
      remove(entities, this)
      Generator.list.forEach(gen => {
        if (gen.failure == this) {
          gen.failure = null
        }
      })
    }
  }
}