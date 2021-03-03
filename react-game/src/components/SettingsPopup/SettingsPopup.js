import React, {useState} from 'react';
import './SettingsPopup.css';
import {playingModesObj, levelsObj, firstMoveObj} from './../../data/settingsData';

const SettingsPopup = (props) => {

    const {gameSettings: {mode, matrixSize, move, theme, user, opponent}} = props;

    const [selectedMode, setSelectedMode] = useState(mode);
    const [selectedLevel, setSelectedLevel] = useState(matrixSize);
    const [isFirstMoveMine, setIsFirstMoveMine] = useState(move);
    const [selectedGameTheme, setGameTheme] = useState(theme);
    const [usersName, setUsersName] = useState(user);
    const [opponentsName, setOpponentsName] = useState(opponent);

    const {
        changeSettingsVisibility,
        saveGameSettings
    } = props;

    const playingModeQuestions = (
        <div className = "question-wrapper">
            <p className="text-primary">{playingModesObj.title}</p>    
            <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={(e)=> setSelectedMode(e.target.value)}>
            {playingModesObj.options.map((option, index)=> {
                return (
                    <label key={index} className={`btn btn-outline-info ${selectedMode === option.value ? 'active' : ''}`}>
                        <input type="radio" name={option.name} autoComplete="off" value={option.value} defaultChecked={selectedMode === option.value}/> {option.label}
                    </label>
                )
            })} 
            </div>                            
        </div>
    )

    const levelQuestions = (
        <div className = "question-wrapper">
            <p className="text-primary">{levelsObj.title}</p>    
            <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={(e)=> setSelectedLevel(+e.target.value)}>
            {levelsObj.options.map((option, index)=> {
                return (
                    <label key={index} className={`btn btn-outline-warning ${+selectedLevel === +option.value ? 'active' : ''}`}>
                        <input type="radio" name={option.name} autoComplete="off" value={option.value} defaultChecked={+selectedLevel === +option.value}/> {option.label}
                    </label>
                )
            })} 
            </div>   
        </div>
    )

    const movesTurnQuestions = (
        <div className = "question-wrapper">
            <p className="text-primary">{firstMoveObj.title}</p>    
            <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={(e)=> setIsFirstMoveMine(e.target.value)}>
            {firstMoveObj.options.map((option, index)=> {
                return (
                    <label key={index} className={`btn btn-outline-info ${isFirstMoveMine === option.value ? 'active' : ''}`}>
                        <input type="radio" name={option.name} autoComplete="off" value={option.value} defaultChecked={isFirstMoveMine === option.value}/> {option.label}
                    </label>
                )
            })} 
            </div>   
        </div>
    )

    const themeQuestions = (
        <div className="form-group">
            <label htmlFor="exampleSelect2">Choose playing theme</label>
            <select multiple="" className="form-control" id="exampleSelect2" value={selectedGameTheme} onChange={(e)=>setGameTheme(e.target.value)}>
                <option value="classic">Classic</option>
                <option value="react-angular">Rect vs Angular</option>
                <option value="sun-moon">Sun vs Moon</option>
                <option value="fruits-veggies">Fruits vs Veggies</option>
                <option value="tom-djerry">Tom vs Jerry</option>
                <option value="djoker-batman">Joker vs Batman</option>
                <option value="winter-summer">Winter vs Summer</option>
            </select>
        </div>
    )

    const usersNameInput = (
        <div className="form-group">
            <label className="col-form-label" htmlFor="inputDefault">Your name</label>
            <input type="text" className="form-control" placeholder="Enter Your name" value={usersName} onChange={(e)=>setUsersName(e.target.value)} />
        </div>
    )

    const opponentsNameInput = (
        <div className="form-group">
            <label className="col-form-label" htmlFor="inputDefault">Your opponent's name</label>
            <input type="text" className="form-control" placeholder="Enter your opponent's name" value={opponentsName} onChange={(e)=>setOpponentsName(e.target.value)} />
        </div>
    )

    const saveChanges = () => {
        saveGameSettings({
            mode: selectedMode,
            matrixSize: selectedLevel,
            move: isFirstMoveMine,
            theme: selectedGameTheme,
            user: usersName,
            opponent: opponentsName
        })
        changeSettingsVisibility();
    }

    return (
        <div className="settings-layout">
            <div className="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Change settings</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={changeSettingsVisibility}>
                        <span aria-hidden="true" >&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {playingModeQuestions}
                        {levelQuestions}
                        {movesTurnQuestions}
                        {themeQuestions}
                        {usersNameInput}
                        {opponentsNameInput}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={saveChanges}> Save changes </button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={changeSettingsVisibility}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPopup;