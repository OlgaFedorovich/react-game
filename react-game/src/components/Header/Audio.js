import React from 'react';


const AudioButtons = ({changeSoundSettingsVisibility}) => {
    return(
        <div className= 'sound-buttons-wrapper'>

            <div className="header-button btn btn-info" onClick={changeSoundSettingsVisibility}>
                <i className="fa fa-volume-up"></i>
            </div>
        </div>

    )
}

export default AudioButtons;