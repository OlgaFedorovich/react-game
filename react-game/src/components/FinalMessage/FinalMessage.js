import React, {useEffect} from 'react';
import './FinalMessage.css';

const FinalMessage = ({movesCount, currentPlayer, hideFinalMessage, winnerPlayer}) => {
    useEffect(()=> {
        const id = setTimeout(()=>hideFinalMessage(), 9000); 
        return () => clearTimeout(id);           
    }, []);

    return (
        <div className="final-message-layout">
            <div className={`final-message-wrapper ${winnerPlayer === 'Nobody' ? 'draw-message' : 'winning-message'}`}>
                <div className={`alert alert-dismissible final-message-text ${winnerPlayer === 'Nobody' ? 'alert-danger' : 'alert-info'}`}>
                    <h3><strong>Game Is Over!</strong></h3>
                    <div><strong><span className="winner-name text-secondary">{`${winnerPlayer} is winner!`}</span></strong></div>
                    <div>{`It was made ${movesCount} moves!`}</div>
                    <div className="text-secondary">Let's play again!</div>
                </div>
            </div>   
        </div> 
    )
}

export default FinalMessage;