import React, {useState} from 'react';
import './SettingsPopup.css';
import {playingModesObj, levelsObj, firstMoveObj} from './../../data/settingsData';

const SettingsPopup = (props) => {

    const {gameSettings: {mode, matrixSize, move, theme}} = props;

    const [selectedMode, setSelectedMode] = useState(mode);
    const [selectedLevel, setSelectedLevel] = useState(matrixSize);
    const [isFirstMoveMine, setIsFirstMoveMine] = useState(move);
    const [selectedGameTheme, setGameTheme] = useState(theme);

    const {
        changeSettingsVisibility,
        saveGameSettings
    } = props;

    const playingModeQuestions = (
        <div className = "question-wrapper">
            <p className="text-primary">{playingModesObj.title}</p>    
            <div className="btn-group btn-group-toggle" data-toggle="buttons" onChange={(e)=> setSelectedMode(e.target.value)}>
            {playingModesObj.options.map((option)=> {
                return (
                    <label className={`btn btn-outline-info ${selectedMode === option.value ? 'active' : ''}`}>
                        <input type="radio" name={option.name} autocomplete="off" value={option.value} defaultChecked={selectedMode === option.value}/> {option.label}
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
            {levelsObj.options.map((option)=> {
                return (
                    <label className={`btn btn-outline-warning ${+selectedLevel === +option.value ? 'active' : ''}`}>
                        <input type="radio" name={option.name} autocomplete="off" value={option.value} defaultChecked={+selectedLevel === +option.value}/> {option.label}
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
            {firstMoveObj.options.map((option)=> {
                return (
                    <label className={`btn btn-outline-info ${isFirstMoveMine === option.value ? 'active' : ''}`}>
                        <input type="radio" name={option.name} autocomplete="off" value={option.value} defaultChecked={isFirstMoveMine === option.value}/> {option.label}
                    </label>
                )
            })} 
            </div>   
        </div>
    )

    const themeQuestions = (
        <div className="form-group">
            <label for="exampleSelect2">Choose playing theme</label>
            <select multiple="" class="form-control" id="exampleSelect2" value={selectedGameTheme} onChange={(e)=>setGameTheme(e.target.value)}>
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

    const saveChanges = () => {
        saveGameSettings({
            mode: selectedMode,
            matrixSize: selectedLevel,
            move: isFirstMoveMine,
            theme: selectedGameTheme
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
                    </div>
                    <div class="modal-footer">
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