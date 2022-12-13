import React, {FC, useCallback, useMemo} from 'react';
import {makeBet, resetBets, setResolveAsync} from "../../store/slice";
import {
    selectBalance,
    selectBets,
    selectComputerBetSpot,
    selectGameStage,
    selectPlayerWinBetSpot,
    selectWinAmount
} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";

import styles from "./app.module.scss";
import {BetSpot, GameStage} from "../../assets/types";
import {otherBetSpots} from "../../assets/helpers";
import {BetSpotButton, Button, Header, Result, Resolve} from "../index";

export const App: FC = () => {
    const BET_SIZE = 500;
    const DEALING_TIME = 2_000; // ms

    const winAmount = useSelector(selectWinAmount);
    const dispatch = useDispatch<AppDispatch>();
    const bets = useSelector(selectBets);
    const balance = useSelector(selectBalance);
    const gameStage = useSelector(selectGameStage);
    const playerWinBetSpot = useSelector(selectPlayerWinBetSpot);
    const computerBetSpot = useSelector(selectComputerBetSpot);
    const sumBets = Object.values(bets).reduce((acc, bet) => acc + bet, 0);
    const isBettingStage = gameStage === GameStage.Betting;
    const isDealingStage = gameStage === GameStage.Dealing;
    const isResolveStage = gameStage === GameStage.Resolve;

    const onBetSpotClick = useCallback((betSpot: BetSpot) => {
        if (
            otherBetSpots[betSpot].every(spot => !!bets[spot]) // reject bet on all betSpots
            || !isBettingStage // reject bet not on betting stage
        ) return;
        dispatch(makeBet({value: BET_SIZE, betSpot}));
    }, [bets, dispatch, isBettingStage]);

    const onPlayClick = useCallback(
        () => dispatch(isResolveStage ? resetBets() : setResolveAsync(DEALING_TIME)),
        [dispatch, isResolveStage]
    );

    const notNullableBets = useMemo(() => Object
        .entries(bets)
        .filter(([, value]) => !!value)
        .map(([key]) => key),
        [bets]
    );

    return (
        <div className={styles.app}>
            <Header balance={balance} win={winAmount} bet={sumBets} />
            <div className={styles.top}>
                {
                    isDealingStage && (
                        <Result
                            computer={computerBetSpot}
                            player={playerWinBetSpot ?? notNullableBets[0]}
                        />
                    )
                }
                {
                    isResolveStage && (
                        <Resolve
                            winAmount={winAmount}
                            winningBetSpot={playerWinBetSpot ?? computerBetSpot}
                            isTie={!playerWinBetSpot && notNullableBets.includes(computerBetSpot ?? "")}
                        />
                    )
                }
            </div>
            <div className={`${styles.middle} ${isBettingStage ? styles.middle_betting : ""}`}>
                {
                    [BetSpot.Rock, BetSpot.Paper, BetSpot.Scissors].map(betSpot => (
                        <BetSpotButton
                            key={betSpot}
                            type={betSpot}
                            bet={bets[betSpot]}
                            onClick={onBetSpotClick}
                            isWin={playerWinBetSpot === betSpot}
                        />
                    ))
                }
            </div>
            <div className={styles.bottom}>
                <Button
                    onClick={onPlayClick}
                    disabled={isDealingStage || !sumBets}
                    text={isResolveStage ? "CLEAR" : "PLAY"}
                />
            </div>
        </div>
    );
}
