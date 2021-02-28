import React, {useEffect} from 'react';
import './FinalMessage.css';

const FinalMessage = ({movesCount, currentPlayer, hideFinalMessage, winnerPlayer}) => {
    useEffect(()=> {
        const id = setTimeout(()=>hideFinalMessage(), 9000); 
        return () => clearTimeout(id);           
    }, []);

    console.log(movesCount, currentPlayer);
    return (
        <div className="final-message-layout">
            <div className="final-message-wrapper">
            <div class="alert alert-dismissible alert-info final-message-text">
                <strong>Game Is Over!</strong>{`${winnerPlayer} player won!`} <a href="#" class="alert-link">{`It was made ${movesCount} moves!`}</a>
            </div>
            </div>
        </div>
    )
}

export default FinalMessage;