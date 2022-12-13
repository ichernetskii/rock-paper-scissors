import {BetSpot} from "./types";

export function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const mapIntToGameStage: Record<number, BetSpot> = {
  0: BetSpot.Rock,
  1: BetSpot.Paper,
  2: BetSpot.Scissors
}

export const otherBetSpots = {
  [BetSpot.Rock]: [BetSpot.Paper, BetSpot.Scissors],
  [BetSpot.Paper]: [BetSpot.Rock, BetSpot.Scissors],
  [BetSpot.Scissors]: [BetSpot.Rock, BetSpot.Paper],
}

const winRules = {
  [BetSpot.Rock]: BetSpot.Paper,
  [BetSpot.Paper]: BetSpot.Scissors,
  [BetSpot.Scissors]: BetSpot.Rock,
}

export function isPlayerWins(player: BetSpot, computer: BetSpot): boolean {
  return winRules[computer] === player;
}
