import React, {useContext, useEffect, useState} from 'react';
import './PlayersDashboard.css';
import './../Board/Board.css';
import {SettingsContext} from '../Game/Game';
import {playersRoles} from './../../data/settingsData';

const PlayersDashboard = (props) => {
    const {mode, level, move, theme, user, opponent} = useContext(SettingsContext);

    const {currentPlayer, movesCount} = props;

    const Player_X = playersRoles['X'][theme];
    const Player_O = playersRoles['O'][theme];

    const Player_1 = move === "true" ? user : opponent;
    const Player_2 = move === 'false' ? user : opponent;

    return (
        <div className="card text-white bg-warning mb-3 dashboard" style={{"maxWidth": "50rem"}}>
            <div className="card-header dashboard-header">
                <div>
                    <span className="dashboard-span">Moves:</span> {movesCount}
                </div>
                <div>
                    <span className="dashboard-span">Mode:</span> {mode === 'computer' ? 'With computer' : mode}
                </div>
            </div>
            <div className="card-body d-flex dashboard-players">
                    <div className="dashboard-left dashboard-player player-x">
                        <div className="card-name-wrapper">
                            <h3 className="card-player">{Player_X}</h3>
                            <span>-</span>
                            <h4 className="card-title">{Player_1}</h4>
                        </div>
                        <div className="dashboard-mark">
                            <span className={`x-player player-mark ${theme}`}></span>                                                  
                        </div>
                    </div>
                    <div className="move-arrow-wrapper">
                        <div className={`dashboard-move-arrow ${currentPlayer === 'O' ? 'dashboard-move-arrow-right' : 'dashboard-move-arrow-left'}`}></div>
                        <span className="badge badge-pill badge-info move-turn">Move</span>
                    </div>
                    <div className="dashboard-right dashboard-player player-o">
                        <div className="card-name-wrapper">
                            <h4 className="card-title">{Player_2}</h4>
                            <span> - </span>
                            <h3 className="card-player">{Player_O}</h3>                        
                        </div>

                        <div className="dashboard-mark">
                            <span className={`o-player player-mark ${theme}`}></span>                            
                        </div> 
                    </div>
            </div>
        </div>
    )
}

export default PlayersDashboard;