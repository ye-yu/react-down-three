import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';


export class PreferenceState {
  activeTheme: keyof typeof import("../constants/theme")["themes"] = "light"

  constructor() {
    makeAutoObservable(this)
    makePersistable<PreferenceState, keyof PreferenceState>(this, {
      name: "PreferenceState",
      properties: ["activeTheme"],
      storage: window.localStorage,
    })
  }

  selectTheme(theme: typeof this["activeTheme"]) {
    this.activeTheme = theme
  }
}