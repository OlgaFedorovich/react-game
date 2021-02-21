import React from 'react';
import SettingsButton from './Settings';
import AudioButton from './Audio';
import './Header.css';

const Header = (props) => {
    return(
        <header className="game-header">
            <AudioButton/>
            <h1 className="app-title"><span className="text-warning">Tic-Tac-Toe</span> <span className="text-info">Game</span></h1>
            <SettingsButton {...props}/>            
        </header>
    )
}

export default Header;