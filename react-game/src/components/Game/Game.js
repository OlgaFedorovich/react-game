import React, {useState, useEffect} from 'react';
import Board from '../Board/Board';
import './../../styles/bootstrap.min.css';
import './Game.css';
import Header from '../Header/Header';
import FooterNav from '../FooterNav/FooterNav';
import SettingsPopup from '../SettingsPopup/SettingsPopup';
import RulesInfoPopup from '../RulesInfoPopup/RulesInfoPopup';
import BestResultsPopup from '../BestResultsPopup/BestResultsPopup';
import PlayersDashboard from '../PlayersDashboard/PlayersDashboard';
import FinalMessage from '../FinalMessage/FinalMessage';
import SoundSettings from '../SoundSettings/SoundSettings';
import click from './../../assets/sounds/sound3.mp3';
import winning from './../../assets/sounds/winning3.mp3';
import reset from './../../assets/sounds/newgame.mp3';
import draw from './../../assets/sounds/draw2.mp3';

export const SettingsContext = React.createContext(null);

const Game = () => {

    const handleKeyboardEvents = (event) => {
        if (event.code === 'KeyS' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            setSettingsVisibility((settingsVisibility) => !settingsVisibility);
        }
        if (event.code === 'KeyR' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            setBestResultsVisibility((bestResultsVisibility) => !bestResultsVisibility);
        }
        if (event.code === 'KeyI' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            setRulesInfoVisibility((rulesInfoVisibility) => !rulesInfoVisibility);
        }
        if (event.code === 'KeyG' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            changeStateOfGame(true);
        }
        if (event.code === 'KeyA' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            setSoundSettingsVisibility((soundSettingsVisibility) => !soundSettingsVisibility);
        }
    };

    useEffect(()=> {
        document.addEventListener('keydown', handleKeyboardEvents);
    }, []);
    
    const defaultSettings = {
        mode: 'alone',
        matrixSize: 3,
        move: 'true',
        theme: 'classic',
        user: 'My name',
        opponent: "Opponent's name"
    };

    const [gameSettings, setGameSettings] = useState(JSON.parse(localStorage.getItem('settings')) || defaultSettings);

    const [settingsVisibility, setSettingsVisibility] = useState(false);

    const [bestResultsVisibility, setBestResultsVisibility] = useState(false);

    const [rulesInfoVisibility, setRulesInfoVisibility] = useState(false);

    const [soundSettingsVisibility, setSoundSettingsVisibility] = useState(false);

    const [currentPlayer, setCurrentPlayer] = useState(JSON.parse(localStorage.getItem('current-player')) || 'O');

    const [movesCount, setMovesCount] = useState(JSON.parse(localStorage.getItem('moves-count')) || 0);

    const [isNewGame, setIsNewGame] = useState(JSON.parse(localStorage.getItem('game-status')) || true);

    const [finalMessage, setFinalMessage] = useState(false);

    const [winnerPlayer, setWinnerPlayer] = useState('');

    const showFinalMessage = (winning, currentPlayer) => {
        let winnersName;
        const {move, user, opponent} = gameSettings;
        if(winning) {
            if(move==="true") {
                winnersName = currentPlayer === 'X'? user : opponent;
            } else {
            winnersName = currentPlayer === 'O' ? user : opponent;
            }            
        } else {
            winnersName = 'Nobody';
        }

        setWinnerPlayer(winnersName);
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
        setCurrentPlayer(nextPlayer);
        localStorage.setItem('current-player', JSON.stringify(nextPlayer));
    };

    const increaseMovesCount = () => {
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

    const [audio, setAudio] = useState(new Audio());
    const [audioVolume, setAudioVolume] = useState(JSON.parse(localStorage.getItem('sound-volume')) || 0.2);

    const playSound = (soundOption) => {
        const soundsSrc = {
            'click': click,
            'winning': winning,
            'draw': draw,
            'reset': reset
        }
        audio.volume = audioVolume;
        audio.src = soundsSrc[soundOption];
        if(!audio) return;
        audio.currentTime = 0;
        audio.play();    
    }

    const volumeChange = (value) => {    
        localStorage.setItem('sound-volume', JSON.stringify(value));
        setAudioVolume(value); 
    }

    return (
        <div className ={`game-container ${gameSettings.theme}`}>
            <div className="game-wrapper">
                <Header 
                    changeSettingsVisibility={() =>setSettingsVisibility(!settingsVisibility)}
                    changeSoundSettingsVisibility={() =>setSoundSettingsVisibility(!soundSettingsVisibility)}
                />
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
                        playSound={playSound}
                                            
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

            {rulesInfoVisibility 
            ? <RulesInfoPopup
                changeRulesInfoVisibility={() =>setRulesInfoVisibility(!rulesInfoVisibility)}
            /> 
            : null}

            {soundSettingsVisibility 
            ? <SoundSettings
                changeSoundSettingsVisibility={() =>setSoundSettingsVisibility(!soundSettingsVisibility)}
                volumeChange={volumeChange}
                audioVolume={audioVolume}
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

export default Game;