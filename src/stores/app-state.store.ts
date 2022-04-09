import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';
import { Difficulty } from "../constants/difficulty";

export class AppState {
  successCount: number = 0
  difficulty: Difficulty = Difficulty.Easy
  timeLapse: number = 0
  startTypeLapse: boolean = false

  constructor() {
    makeAutoObservable(this)
    makePersistable<AppState, keyof AppState>(this, {
      name: "AppState",
      properties: ["successCount", "difficulty"],
      storage: window.localStorage,
    })
  }

  win() {
    this.successCount += 1
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
}
