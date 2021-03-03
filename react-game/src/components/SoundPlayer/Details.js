import React from 'react';


const Details = ({song: {title, artist}}) => {
    return (
        <div className="sound-player-details">
            <span className="card-title">{title}</span>
            <span className="card-text">{artist}</span>
        </div>

    )

}

export default Details;