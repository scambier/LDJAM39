let random = [
  "You're not really doing a great job",
  ""
]

class Log {
  static history : string[]

  static reset(){
    this.history = []
  }

  static print(text) {
    this.history.push(text)
  }

  static draw() {
    // 15,9 > 15,15
    for (let i = 1; i <= this.history.length && i < 9; i++) {
      let str = this.history[this.history.length-i]
      print(str, 1, (17 * 8) - (i * 8) + 1)
    }
  }
}