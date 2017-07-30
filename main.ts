const entities: Entity[] = []

let
  t = 0,
  player: Player,
  extinguisher: Entity,
  wrench: Entity,
  camera: Camera

function init() {
  camera = new Camera()
  player = new Player(6 * 8, 6 * 8)
  extinguisher = new Entity(8, 8, EXTINGUISHER, {takeable: true})
  wrench = new Entity(8, 8, WRENCH, {takeable: true})
  Building.findAll()
  Generator.findAll()

  let arr = [
    ["Look at that city.", 1000],
    ["It will soon run out of power, because", 2000],
    ["  your generators suck.", 2200],
    ["They're old, prone to fail or catch fire.", 5000],
    ["Or to be eaten by rats and stuff.", 7000],

    ["", 10000],
    ["(Your cable management sucks too)", 10200],
    ["(I mean, look at that mess)", 12000],
    ["", 14000],
    ["By the way, shit's on fire, yo.", 14000],

    // ["Anyway, do your best to keep the", 14000],
    // ["  city powered all night.", 14200],
    // ["Because while you're reading this,", 16000],
    // ["  your city is going dark...", 18000],
  ]
  arr.forEach(item => {
    wait(() => {
      Log.print(item[0])
    }, item[1])
  })

  Building.manageAll()
  wait(Generator.startFailures, 1000)
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
   * Drawing
   */
  draw(t)

  /*
   * Input Move
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

  /*
   * Input Actions
   */
  if (btnp(TAKE)) {
    player.take()
  }
  if (btn(USE)) {
    player.use()
  }

  entities.forEach(entity => {
    entity.update(t)
  })

  t++;
}

function draw(t: number) {
  map(0, 0, 30, 17, 0, 0)

  entities.forEach(entity => {
    entity.draw(t)
  })

  Log.draw()
}