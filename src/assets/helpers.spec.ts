import { BetSpot } from "./types";
import {isPlayerWins} from "./helpers";

describe("isPlayerWins test cases", () => {
    it.each<[BetSpot, BetSpot, boolean]>([
        [BetSpot.Rock, BetSpot.Rock, false],
        [BetSpot.Rock, BetSpot.Scissors, true],
        [BetSpot.Rock, BetSpot.Paper, false],
    ])(".isPlayerWins(%s, %s)", (player, computer, expected) => {
        expect(isPlayerWins(player, computer)).toBe(expected);
    })
});

export {};
