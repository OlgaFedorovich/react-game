import React, {useState} from 'react';
import Board from './../Board/Board';
import './../../styles/bootstrap.min.css';
import './App.css';
import Header from './../Header/Header';
import SettingsPopup from './../SettingsPopup/SettingsPopup';

export const SettingsContext = React.createContext(null);

const App = () => {

    const [settingsVisibility, setSettingsVisibility] = useState(false);

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
                        matrixSize={+gameSettings.level}
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