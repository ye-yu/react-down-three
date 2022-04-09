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
  }

  updateTimeLapse(time: typeof this["timeLapse"]) {
    this.timeLapse += time
    const self = this
    requestAnimationFrame(ms => {
      if (self.startTypeLapse) self.updateTimeLapse(ms)
    })
  }

  stopTimeLapse() {
    this.startTypeLapse = false
  }
}
