const
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,

  COLLIDES = [
    3, 11, // walls
    16, 17, 32, 33 // generators
  ]

function randRangeInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function surface(width: number, height: number): number {
  return width * height
}

function surfaceCoords(x1: number, y1: number, x2: number, y2: number): number {
  const width = x2 - x1;
  const height = y2 - y1;
  return width * height;
}

const FLAGS = [];

function fset(i, f): void {
  const val = FLAGS[i] || 0
  FLAGS[i] = val | (1 << f)
}

function fget(i, f): number {
  return FLAGS[i] & (1 << f)
}

if (!Math.sign) {
  Math.sign = function (x) {
    // If x is NaN, the result is NaN.
    // If x is -0, the result is -0.
    // If x is +0, the result is +0.
    // If x is negative and not -0, the result is -1.
    // If x is positive and not +0, the result is +1.
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
      return Number(x);
    }
    return x > 0 ? 1 : -1;
  };
}

// function setSpritesFlags(): void {
//   fset(dungeon.idWall, COLLIDES)
// }

function clearMap(): void {
  for (let y = 0; y < 17 * 8; y++) {
    for (let x = 0; x < 30 * 8; x++) {
      mset(x, y, 0)
    }
  }
  sync()
}

const waitingCallbacks = []

function wait(cb, t): void {
  waitingCallbacks.push({cb: cb, t: time() + t*1000})
}

function checkWaitingCallbacks() {
  for (let i = 0; i <= waitingCallbacks.length; i++) {
    const item = waitingCallbacks[i]
    if (item && time() > item.t) {
      item.cb()
      waitingCallbacks.splice(i, 1)
    }
  }
}