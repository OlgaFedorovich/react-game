import React, {useContext, useEffect, useState} from 'react';
import './PlayersDashboard.css';
import './../Board/Board.css';
import {SettingsContext} from './../App/App';

const PlayersDashboard = (props) => {
    const {mode, level, move, theme} = useContext(SettingsContext);

    const {currentPlayer, movesCount} = props;

    const Player_X = move === "true" ? 'My name' : 'My opponent';
    const Player_O = move === 'false' ? 'My name' : 'My opponent';


    return (
        <div className="card text-white bg-warning mb-3 dashboard" style={{"max-width": "50rem"}}>
            <div className="card-header">
                Moves: {movesCount}
            </div>
            <div className="card-body d-flex dashboard-players">
                    <div className="dashboard-left dashboard-player player-x">
                        <h4 className="card-title">{Player_X}</h4>
                        <div className="dashboard-mark">
                            <span className={`x-player player-mark ${theme}`}></span>                                                  
                        </div>

                    </div>
                    <div className="move-arrow-wrapper">
                        <div className={`dashboard-move-arrow ${currentPlayer === 'O' ? 'dashboard-move-arrow-right' : 'dashboard-move-arrow-left'}`}></div>
                        <span class="badge badge-pill badge-info move-turn">Move</span>
                    </div>
                    <div className="dashboard-right dashboard-player player-o">
                        <h4 class="card-title">{Player_O}</h4>
                        <div className="dashboard-mark">
                            <span className={`o-player player-mark ${theme}`}></span>                            
                        </div> 
                    </div>
            </div>
        </div>
    )
}

export default PlayersDashboard;