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

    const [time, setTime] = useState(JSON.parse(localStorage.getItem('games-time')) || {s: 0, m: 0, h: 0});
    const [interv, setInterv] = useState();

    const showFinalMessage = (winner, draw, moves, currentPlayer) => {
        setWinnerPlayer(currentPlayer);
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

    let updatedMs = time.ms, 
        updatedS = time.s, 
        updatedM = time.m, 
        updatedH = time.h;

    useEffect(()=> {
        startTimer();
        return () => clearInterval(interv);
    }, []);

    const resetTime = () => {
        clearInterval(interv);
        setTime({s:0, m:0, h:0})
    }

    const startTimer = () => {
        runTimer();
        setInterv(setInterval(runTimer, 1000));
    };
        
    const runTimer = () => {
      if(updatedM === 60){
        updatedH++;
        updatedM = 0;
      }
      if(updatedS === 60){
        updatedM++;
        updatedS = 0;
      }

      updatedS++;

      localStorage.setItem('games-time', JSON.stringify(
        {
            s:updatedS, 
            m:updatedM, 
            h:updatedH
        }
      ));

      return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
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
                        time={time}    
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