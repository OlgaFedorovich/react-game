import React from 'react';
import Game from './../Game/Game';
import SoundPlayer from './../SoundPlayer/SoundPlayer';
import './App.css';

const App = () => {
    return (<div className="main-game-wrapper">
        <Game/>
        <SoundPlayer/> 
    </div>
    )
}

export default App;