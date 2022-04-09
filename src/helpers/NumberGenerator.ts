import { Difficulty } from "../constants/difficulty";

export function GenerateNumber(difficulty = Difficulty.Easy) {
  switch (difficulty) {
    case Difficulty.Easy:
      return ~~(Math.random() * 100)
    case Difficulty.Intermediate:
      return ~~(Math.random() * 10000) + 100
    case Difficulty.Expert:
      return ~~(Math.random() * 1000000) + 10000
  }
}