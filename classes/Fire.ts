class Fire extends Entity {
  constructor(x, y) {
    super(x, y, 273)
  }

  draw(t) {
    super.draw(t)
    if (t % 30 == 0) {
      this.flip = !this.flip
    }
  }
}