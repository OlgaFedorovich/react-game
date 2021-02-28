import React, {useState, useEffect} from 'react';
import Board from './../Board/Board';
import './../../styles/bootstrap.min.css';
import './App.css';
import Header from './../Header/Header';
import FooterNav from './../FooterNav/FooterNav';
import SettingsPopup from './../SettingsPopup/SettingsPopup';
import BestResultsPopup from './../BestResultsPopup/BestResultsPopup';
import PlayersDashboard from './../PlayersDashboard/PlayersDashboard';
import FinalMessage from './../FinalMessage/FinalMessage';
import {setToLocalStorage, getFromLocalStorage} from './../../data/functions';

export const SettingsContext = React.createContext(null);

const App = () => {
    
    const defaultSettings = {
        mode: 'alone',
        matrixSize: 3,
        move: 'true',
        theme: 'classic'
    };

    const [gameSettings, setGameSettings] = useState(JSON.parse(localStorage.getItem('settings')) || defaultSettings);

    const [settingsVisibility, setSettingsVisibility] = useState(false);

    const [bestResultsVisibility, setBestResultsVisibility] = useState(false);

    const [rulesInfoVisibility, setRulesInfoVisibility] = useState(false);

    const [currentPlayer, setCurrentPlayer] = useState(JSON.parse(localStorage.getItem('current-player')) || 'O');

    const [movesCount, setMovesCount] = useState(JSON.parse(localStorage.getItem('moves-count')) || 0);

    const [isNewGame, setIsNewGame] = useState(JSON.parse(localStorage.getItem('game-status')) || true);

    const [finalMessage, setFinalMessage] = useState(false);

    const [winnerPlayer, setWinnerPlayer] = useState('');

    console.log(isNewGame, 'game-status app');
    console.log(JSON.parse(localStorage.getItem('current-player')));
    console.log(currentPlayer, 'currentPlaey');

    const showFinalMessage = (winner, draw, moves, currentPlayer) => {
        setWinnerPlayer(currentPlayer);
        console.log(winner, 'winner', draw, 'draw', moves, 'moves');
        setFinalMessage(true);
        setTimeout(()=>setIsNewGame(true), 9000);
        localStorage.setItem('game-status', JSON.stringify(true));
        
    };

    const hideFinalMessage = () => {
        setFinalMessage(false);
    };

    useEffect(()=> {
        if(isNewGame && JSON.parse(localStorage.getItem('game-status')) === true) {
            resetMovesCount();   
            setCurrentPlayer('O');         
        }
    }, [isNewGame]);

    const changeStateOfGame = (state) => {
        setIsNewGame(state);
        localStorage.setItem('game-status', JSON.stringify(state));
    };

    const changeCurrentPlayer = (nextPlayer) => {
        //let nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextPlayer);
        localStorage.setItem('current-player', JSON.stringify(nextPlayer));
    };

    const increaseMovesCount = () => {
        //setToLocalStorage('moves-count', movesCount+1);
        setMovesCount((movesCount) => movesCount + 1);
        localStorage.setItem('moves-count', JSON.stringify(movesCount + 1));
        
    };

    const resetMovesCount = () => {
        localStorage.setItem('moves-count', JSON.stringify(0));
        setMovesCount(0);
    };

    const saveGameSettings = (selectedSettings) => {
        setGameSettings(selectedSettings);
        setIsNewGame(true);
        localStorage.setItem('game-status', JSON.stringify(true));
       localStorage.setItem('settings', JSON.stringify(selectedSettings));
    };

    return (
        <div className ={`game-container ${gameSettings.theme}`}>
            <div className="game-wrapper">
                <Header changeSettingsVisibility={() =>setSettingsVisibility(!settingsVisibility)}/>
                <SettingsContext.Provider value={gameSettings}>
                    <Board
                        currentPlayer={currentPlayer}
                        changeCurrentPlayer = {changeCurrentPlayer}
                        increaseMovesCount={increaseMovesCount}
                        resetMovesCount={resetMovesCount}
                        movesCount={movesCount}
                        changeStateOfGame={changeStateOfGame}
                        isNewGame={isNewGame}
                        showFinalMessage={showFinalMessage}
                    />
                    <PlayersDashboard 
                        currentPlayer={currentPlayer}
                        movesCount={movesCount}         
                    />
                </SettingsContext.Provider>
                <FooterNav
                changeRulesInfoVisibility={() =>setRulesInfoVisibility(!rulesInfoVisibility)}
                changeBestResultsVisibility={() =>setBestResultsVisibility(!bestResultsVisibility)}
                />
            </div>

            {settingsVisibility 
            ? <SettingsPopup 
                changeSettingsVisibility={() =>setSettingsVisibility(!settingsVisibility)}
                gameSettings = {gameSettings}
                saveGameSettings={saveGameSettings}
            /> 
            : null}

            {bestResultsVisibility 
            ? <BestResultsPopup
                changeBestResultsVisibility={() =>setBestResultsVisibility(!bestResultsVisibility)}
            /> 
            : null}

            {finalMessage
            ? <FinalMessage
                movesCount={movesCount}
                currentPlayer={currentPlayer}
                hideFinalMessage={hideFinalMessage}
                winnerPlayer={winnerPlayer}
            /> 
            : null}
        </div>
    )
}

export default App;