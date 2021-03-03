import React, {useState, useEffect, useRef} from 'react';
import Details from './Details';
import Controls from './Controls';



const MusicPlayer = ({currentSongIndex, setCurrentSongIndex, nextSongIndex, songs}) => {

    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if(isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

      const skipSong = (forwards = true) => {
        if (forwards) {
          setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp++;
    
            if (temp > songs.length - 1) {
              temp = 0;
            }
    
            return temp;
          });
        } else {
          setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp--;
    
            if (temp < 0) {
              temp = songs.length - 1;
            }
    
            return temp;
          });
        }
      };

    return (
        <div>
            <div className="card text-white bg-info mb-3">

                <div className="card-header">Music</div>
                <div className="card-body">
                    <Details
                        song = {songs[currentSongIndex]}
                    />
                    <Controls
                        isPlaying = {isPlaying}
                        setIsPlaying = {setIsPlaying}
                        skipSong = {skipSong}
                    />

                    <audio 
                        className="audio-player-wrapper"
                        src = {songs[currentSongIndex].src}
                        controls
                        ref={audioEl}
                        autoPlay
                        >
                    </audio>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer;