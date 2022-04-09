import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';
import { Difficulty } from "../constants/difficulty";
import { GameResult } from "../constants/game-result";
import { GenerateNumber } from "../helpers/NumberGenerator";

export class AppState {
  successCount = 0
  gamePlayed = 0
  difficulty: Difficulty = Difficulty.Easy

  // non-persistent state
  timeLapse = 0
  startTypeLapse = false
  gameStarted = false
  selectedNumber = 0
  gameResult = GameResult.None

  constructor() {
    makeAutoObservable(this)
    makePersistable<AppState, keyof AppState>(this, {
      name: "AppState",
      properties: ["successCount", "difficulty", "gamePlayed"],
      storage: window.localStorage,
    })
  }

  win() {
    this.successCount += 1
    this.gamePlayed += 1
    this.gameStarted = false
    this.gameResult = GameResult.Win
    this.stopTimeLapse()
  }

  lose() {
    this.gamePlayed += 1
    this.gameStarted = false
    this.gameResult = GameResult.Lose
    this.stopTimeLapse()
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
