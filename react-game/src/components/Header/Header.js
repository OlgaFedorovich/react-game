import React from 'react';
import SettingsButton from './Settings';
import AudioButtons from './Audio';
import './Header.css';

const Header = (props) => {
    return(
        <header className="game-header">
            <AudioButtons {...props} />
            <h1 className="app-title"><span className="text-warning">Tic-Tac-Toe</span> <span className="text-info">Game</span></h1>
            <SettingsButton {...props}/>            
        </header>
    )
}

export default Header;