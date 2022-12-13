import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isPlayerWins, mapIntToGameStage, randomIntFromInterval} from "../assets/helpers";
import {Bet, BetSpot, GameStage} from "../assets/types";

export interface RootState {
    balance: number;
    bets: Record<BetSpot, number>;
    stage: GameStage;
    computer?: BetSpot;
    playerWinBetSpot?: BetSpot;
    winAmount: number;
}

const initialState: RootState = {
    balance: 5000,
    bets: {
        [BetSpot.Rock]: 0,
        [BetSpot.Paper]: 0,
        [BetSpot.Scissors]: 0
    },
    stage: GameStage.Betting,
    winAmount: 0,
}

const SLICE_NAME = "appState";

export const setResolveAsync = createAsyncThunk(
    `${SLICE_NAME}/setResolveAsync`,
    (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
)

const slice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        makeBet: (state: RootState, action: PayloadAction<Bet>) => {
            const bet = Math.min(state.balance, action.payload.value);
            if (bet) {
                state.bets[action.payload.betSpot] += bet;
                state.balance -= bet;
            }
        },
        resetBets: (state: RootState) => {
            state.bets = initialState.bets;
            state.stage = GameStage.Betting;
            state.winAmount = 0;
            state.playerWinBetSpot = undefined;
            state.computer = undefined;
        }
    },
    extraReducers: {
        [setResolveAsync.pending.type]: state => {
            state.stage = GameStage.Dealing;
            const computerResult = mapIntToGameStage[randomIntFromInterval(0, 2)];
            state.computer = computerResult;

            let playerWinBetSpot: BetSpot | undefined;
            for (const spot in state.bets) {
                const betSpot = spot as BetSpot;
                if (!!state.bets[betSpot] && isPlayerWins(betSpot, computerResult)) {
                    playerWinBetSpot = betSpot;
                }
            }
            state.playerWinBetSpot = playerWinBetSpot;
        },
        [setResolveAsync.fulfilled.type]: state => {
            state.stage = GameStage.Resolve;
            if (state.playerWinBetSpot) {
                const numberOfBetSpotsWithBets = Object.values(state.bets).filter(bet => !!bet).length;
                state.winAmount = (numberOfBetSpotsWithBets === 1 ? 14 : 3) * state.bets[state.playerWinBetSpot];
                state.balance += state.winAmount;
            }
        }
    }
});

const {actions, reducer} = slice;

export const {makeBet, resetBets} = actions;

export default reducer;
