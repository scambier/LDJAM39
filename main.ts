let
  t = 0,
  entities: Entity[],
  player: Player,
  extinguisher: Entity,
  wrench: Entity,
  camera: Camera,

  GAMEOVER: boolean,
  SUCCESS: boolean,

  moonPos: number

function init() {
  clearWaitingCallbacks()

  GAMEOVER = false
  SUCCESS = null
  moonPos = 0

  entities = []
  camera = new Camera()
  player = new Player(6 * 8, 6 * 8)
  extinguisher = new Entity(8, 8, EXTINGUISHER, {takeable: true})
  wrench = new Entity(78, 8, WRENCH, {takeable: true})

  Log.reset()
  Generator.resetAll()
  Building.resetAll()

  moveMoon()

  let arr = [
    "Look at that city.",
    "It will soon run out of power, because",
    "  your generators suck.",
    "They're old, prone to fail or catch fire.",
    "",
    "Your cable management sucks too",
    "(I mean, look at that mess)",
    "",
    "By the way, shit's on fire, yo.",
    "You have a fire extinguisher and a wrench.",
    "Use them to fix those generators.",
    "Try to keep up until the morning!"
  ]
  arr.forEach((item, i) => {
    wait(() => {
      Log.print(item)
    }, i * 2000)
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
    if (GAMEOVER) {
      reset()
    }
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

  drawMoon()

  Log.draw()
}

function gameover(success: boolean) {
  SUCCESS = success
  GAMEOVER = true

  if (SUCCESS) {
    Log.print("")
    Log.print("Congratulations! You held up for the night!")
    wait(() => Log.print("There's no sunrise, sorry, I was a bit"), 2000)
    wait(() => Log.print("  short on time."), 2200)
    wait(() => Log.print("Does it matter though? Nah, you're a winner."), 4000)
    wait(() => Log.print("Press W to restart the game"), 6000)
  }
  else {
    Log.print("")
    Log.print("Wow dude. The city's dark by your fault.")
    wait(() => Log.print("That's cool for the stargazers, but"), 1000)
    wait(() => Log.print("  people are dying. You're an awful person."), 1200)
    wait(() => Log.print("Press W to restart the game"), 4000)
  }
}

function moveMoon() {
  ++moonPos

  if (moonPos == 13 * 8) {
    gameover(true)
  }

  wait(moveMoon, 1000)
}

function drawMoon() {
  spr(261, 15 * 8 + moonPos, 8, 0, 1, 0, 0, 2, 2)
}

function reset() {
  init()
}