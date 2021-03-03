import React from 'react';
import './SoundSettings.css';

const SoundSettings = ({changeSoundSettingsVisibility, volumeChange, audioVolume}) => {
    return (
        <div className="sound-settings-layout">
            <div className="card sound-settings-wrapper border-warning mb-3">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={changeSoundSettingsVisibility}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <div className="card-header">Sound Settings</div>
                <div className="card-body">
                    <h4 className="card-title">Change volume of the sounds in the game</h4>
                    <fieldset className="form-group range-sound">
                        <i className=" fa fa-volume-mute"></i>
                        <input type="range" className="custom-range" id="customRange1" max="1" min="0" step="0.1" value={audioVolume} onChange={(e)=>volumeChange(+e.target.value)}  />
                        <i className="fa fa-volume-up"></i>
                        
                    </fieldset>
                </div>
            </div>
        </div>
    )

}

export default SoundSettings;