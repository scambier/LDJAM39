class Camera {
  offsetX: number
  offsetY: number

  constructor() {
    this.offsetX = 0
    this.offsetY = 0
  }

  get x() {
    return -this.offsetX
  }

  get y() {
    return -this.offsetY
  }

  set x(x) {
    this.offsetX = x
  }

  set y(y) {
    this.offsetY = y
  }

  center(x: number, y: number) {
    this.offsetX = x - 30 * 4
    this.offsetY = y - 17 * 4
  }

  follow(x: number, y: number) {
    const
      centerX = 120,
      centerY = 68,
      maxOffsetX = 16,
      maxOffsetY = 12,
      currX = x + this.x,
      currY = y + this.y,
      offsetX = currX - centerX,
      offsetY = currY - centerY,
      diffX = Math.abs(offsetX) - maxOffsetX,
      diffY = Math.abs(offsetY) - maxOffsetY

    if (diffX > 0) {
      this.offsetX += diffX * Math.sign(offsetX)
    }
    if (diffY > 0) {
      this.offsetY += diffY * Math.sign(offsetY)
    }
  }
}