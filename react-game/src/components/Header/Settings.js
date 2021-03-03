import React, {useState} from 'react';


const SettingsButton = ({changeSettingsVisibility}) => {
    return(
        <div className="header-button btn btn-warning" onClick={changeSettingsVisibility}>
            <i className="fa fa-cogs"></i>
        </div>
    )
}

export default SettingsButton;