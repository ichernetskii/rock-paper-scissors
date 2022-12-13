import { RootState } from "./slice";

export const selectBets = (state: RootState) => state.bets;
export const selectBalance = (state: RootState) => state.balance;
export const selectGameStage = (state: RootState) => state.stage;
export const selectComputerBetSpot = (state: RootState) => state.computer;
export const selectPlayerWinBetSpot = (state: RootState) => state.playerWinBetSpot;
export const selectWinAmount = (state: RootState) => state.winAmount;
