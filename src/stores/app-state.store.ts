import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

export class AppState {
  successCount: number = 0

  constructor() {
    makeAutoObservable(this)
    makePersistable<AppState, keyof AppState>(this, {
      name: "AppState",
      properties: ["successCount"],
      storage: window.localStorage,
    })
  }

  win() {
    this.successCount += 1
  }
}