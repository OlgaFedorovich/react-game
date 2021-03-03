import React, {useState, useEffect} from 'react';
import './SoundPlayer.css';
import MusicPlayer from './MusicPlayer';
import {songs} from './../../data/musicData';

const SoundPlayer = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(0);

    const [soundPlayerVisibility, setSoundPlayerVisibility] = useState(true);

    useEffect(() => {
        setNextSongIndex(() => {
          if (currentSongIndex + 1 > songs.length - 1) {
            return 0;
          } else {
            return currentSongIndex + 1;
          }
        });
      }, [currentSongIndex]);

    return (
        <div className={`sound-player-wrapper ${!soundPlayerVisibility ? 'player-hidden' : ''}`}>
            <button className="sound-close-button" onClick={()=> setSoundPlayerVisibility(!soundPlayerVisibility)}>
                <i className={`fa ${soundPlayerVisibility ? 'fa fa-times-circle' : 'fa-external-link-square-alt'}`}></i>
            </button>
            
            <MusicPlayer
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                nextSongIndex={nextSongIndex}
                songs={songs}
            />
        </div>
    )

}

export default SoundPlayer;