let
  t = 0,
  player: Entity,
  camera: Camera

function init() {
  camera = new Camera()
  player = new Entity(6, 6, 256)

  let arr = [
    ["Look at that city.", 1],
    ["It will soon run out of power, because", 2],
    ["  your generators suck.", 2.2],
    ["They're old, prone to fail or catch fire.", 5],
    ["Or to be eaten by rats and stuff.", 7],

    ["", 10],
    ["(Your cable management suck too)", 10.2],
    ["(I mean, look at that mess)", 12],
  ]
  arr.forEach(item => {
    wait(() => {
      Log.print(item[0])
    }, item[1])
  })
}

function TIC() {
  cls(12);
  checkWaitingCallbacks()

  /*
   * Init
   */
  if (t == 0) {
    init();
  }

  /*
   * Input
   */
  let vect: Vector2 = {x: 0, y: 0}

  if (btn(UP)) {
    vect.y = -1
  }
  if (btn(DOWN)) {
    vect.y = 1
  }
  if (btn(LEFT)) {
    vect.x = -1
  }
  if (btn(RIGHT)) {
    vect.x = 1
  }
  player.moveTo(vect)

  player.update(t)

  /*
   * Drawing
   */
  draw(t)

  t++;
}

function draw(t: number) {
  map(0, 0, 30, 17, 0, 0)
  player.draw()
  Log.draw()
}