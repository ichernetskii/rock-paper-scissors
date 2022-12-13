export enum BetSpot {
    Rock = "Rock",
    Paper = "Paper",
    Scissors = "Scissors",
}

export interface Bet {
    betSpot: BetSpot;
    value: number;
}

export enum GameStage {
    Betting = "Betting",
    Dealing = "Dealing",
    Resolve = "Resolve",
}
