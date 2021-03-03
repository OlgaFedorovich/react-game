import React from 'react';

const Controls = ({isPlaying, setIsPlaying, skipSong}) => {
    return (
        <div className="controls-buttons-wrapper" onClick={()=>skipSong(false)}>
            <button className="controls-button-small">
                <i className="fa fa-backward"></i>
            </button >
            {/* <button className="controls-button-big" onClick={()=>setIsPlaying((isPlaying) => !isPlaying)} >
                <i class={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button> */}
                
            <button className="controls-button-small" onClick={()=>skipSong()}>
                <i className="fa fa-forward"></i>
            </button>
        </div>
    )

}

export default Controls;