import React, {useState} from 'react';
import Board from './../Board/Board';
import './../../styles/bootstrap.min.css';
import './App.css';
import Header from './../Header/Header';
import SettingsPopup from './../SettingsPopup/SettingsPopup';
import PlayersDashboard from './../PlayersDashboard/PlayersDashboard';

export const SettingsContext = React.createContext(null);

const App = () => {

    const [settingsVisibility, setSettingsVisibility] = useState(false);

    const [currentPlayer, setCurrentPlayer] = useState('O');

    const [movesCount, setMovesCount] = useState(0);

    const changeCurrentPlayer = (nextPlayer) => {
        //let nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextPlayer);
    };

    const increaseMovesCount = () => setMovesCount((movesCount) => movesCount + 1);
    const resetMovesCount = () => setMovesCount(0);

    const defaultSettings = {
        mode: 'alone',
        level: 3,
        move: 'true',
        theme: 'classic'
    };

    const [gameSettings, setGameSettings] = useState(defaultSettings);

    const saveGameSettings = (selectedSettings) => {
        setGameSettings(selectedSettings);
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
                    />
                    <PlayersDashboard 
                        currentPlayer={currentPlayer}
                        movesCount={movesCount}         
                    />
                </SettingsContext.Provider>
            </div>
            {settingsVisibility 
            ? <SettingsPopup 
                changeSettingsVisibility={() =>setSettingsVisibility(!settingsVisibility)}
                gameSettings = {gameSettings}
                saveGameSettings={saveGameSettings}
            /> 
            : null}
        </div>
    )
}

export default App;