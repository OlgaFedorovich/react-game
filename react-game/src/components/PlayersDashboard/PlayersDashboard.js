import React, {useContext, useEffect, useState} from 'react';
import './PlayersDashboard.css';
import './../Board/Board.css';
import {SettingsContext} from './../App/App';
import Timer from './../Timer/Timer';

const PlayersDashboard = (props) => {
    const {mode, level, move, theme} = useContext(SettingsContext);

    const {currentPlayer, movesCount, time} = props;

    // const [time, setTime] = useState(JSON.parse(localStorage.getItem('games-time')) || {s: 0, m: 0, h: 0});
    // const [interv, setInterv] = useState();

    const Player_X = move === "true" ? 'My name' : 'My opponent';
    const Player_O = move === 'false' ? 'My name' : 'My opponent';

    // let updatedMs = time.ms, 
    //     updatedS = time.s, 
    //     updatedM = time.m, 
    //     updatedH = time.h;

    // useEffect(()=> {
    //     startTimer();
    //     return () => clearInterval(interv);
    // }, [isNewGame]);

    // useEffect(()=> {
    //     if(isNewGame) {
    //         clearInterval(interv);
    //         setTime({s: 0, m: 0, h:0})
    //     }
    //     return () => clearInterval(interv);
    // }, [isNewGame]);

    // const startTimer = () => {
    //     runTimer();
    //     setInterv(setInterval(runTimer, 1000));
    // };
        
    // const runTimer = () => {
    //   if(updatedM === 60){
    //     updatedH++;
    //     updatedM = 0;
    //   }
    //   if(updatedS === 60){
    //     updatedM++;
    //     updatedS = 0;
    //   }

    //   updatedS++;

    //   localStorage.setItem('games-time', JSON.stringify(
    //     {
    //         s:updatedS, 
    //         m:updatedM, 
    //         h:updatedH
    //     }
    //   ));

    //   return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
    // };
  
    // const stop = () => {
    //   clearInterval(interv);
    //   setStatus(2);
    // };
  
    // const reset = () => {
    //   clearInterval(interv);
    //   setStatus(0);
    //   setTime({ms:0, s:0, m:0, h:0})
    // };


    return (
        <div className="card text-white bg-warning mb-3 dashboard" style={{"max-width": "50rem"}}>
            <div className="card-header dashboard-header">
                <div>
                    Moves: {movesCount}
                </div>
                <Timer time={time}/>
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