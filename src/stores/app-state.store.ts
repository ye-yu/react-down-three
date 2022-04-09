import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';
import { Difficulty } from "../constants/difficulty";
import { GameResult } from "../constants/game-result";
import { GenerateNumber } from "../helpers/NumberGenerator";

export class AppState {
  successCount = 0
  gamePlayed = 0
  difficulty: Difficulty = Difficulty.Easy
  record: {[difficulty: number]: number} = {
    [Difficulty.Easy]: 0,
    [Difficulty.Intermediate]: 0,
    [Difficulty.Expert]: 0,
  }
  time: {[difficulty: number]: number | undefined} = {}

  // non-persistent state
  timeLapse = 0
  startTypeLapse = false
  gameStarted = false
  selectedNumber = 0
  gameResult = GameResult.None
  newRecord = false

  constructor() {
    makeAutoObservable(this)
    makePersistable<AppState, keyof AppState>(this, {
      name: "AppState",
      properties: [
        "successCount",
        "difficulty",
        "gamePlayed",
        "record",
        "time",
      ],
      storage: window.localStorage,
    })
  }

  win() {
    this.successCount += 1
    this.gamePlayed += 1
    this.gameStarted = false
    this.gameResult = GameResult.Win
    this.record = {
      ...this.record,
      [this.difficulty]: this.record[this.difficulty] + 1
    }
    this.stopTimeLapse()
    if (this.timeLapse < (this.time[this.difficulty] ?? +Infinity)) {
      this.newRecord = true
      this.time = {
        ...this.time,
        [this.difficulty]: this.timeLapse,
      }
    }
  }

  lose() {
    this.gamePlayed += 1
    this.gameStarted = false
    this.gameResult = GameResult.Lose
    this.stopTimeLapse()
  }

  reset() {
    this.successCount = 0
    this.gamePlayed = 0
    this.gameStarted = false
    this.gameResult = GameResult.None
    this.timeLapse = 0
    this.record = {
      [Difficulty.Easy]: 0,
      [Difficulty.Intermediate]: 0,
      [Difficulty.Expert]: 0,
    }
    this.time = {}
  }

  setDifficulty(difficulty: typeof this["difficulty"]) {
    this.difficulty = difficulty
  }

  startTimeLapse() {
    this.timeLapse = 0
    this.startTypeLapse = true
    this.updateTimeLapse(0)
    let startTime = performance.now()
    const self = this
    const callBack = (ms: number) => {
      if (!self.startTypeLapse) return
      self.updateTimeLapse(ms - startTime)
      startTime = ms
      requestAnimationFrame(callBack)
    }
    requestAnimationFrame(callBack)
  }

  updateTimeLapse(time: typeof this["timeLapse"]) {
    this.timeLapse += time
  }

  stopTimeLapse() {
    this.startTypeLapse = false
  }

  startGame() {
    this.selectedNumber = GenerateNumber(this.difficulty)
    this.gameResult = GameResult.None
    this.gameStarted = true
    this.newRecord = false
    this.startTimeLapse()
  }

  decrement() {
    this.selectedNumber -= 1
    if (this.selectedNumber < 1) this.lose()
    else if (this.selectedNumber === 1) this.win()
  }

  increment() {
    this.selectedNumber += 1
  }

  down() {
    const number = this.selectedNumber
    if (number % 3 !== 0) this.lose()
    else {
      this.selectedNumber = number / 3
      if (this.selectedNumber === 1) this.win()
    }
  }
}
