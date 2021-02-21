import React, {useState, useEffect, useContext} from 'react';
import './Board.css';
import {SettingsContext} from './../App/App';

const initMatrix = [];
const Board = (props) => {

    const {mode, level, move, theme} = useContext(SettingsContext);
    
    
    const [matrix, setMatrix] = useState(initMatrix);
    const [matrixSize, setMatrixSize] = useState(props.matrixSize);
    const [currentPlayer, setCurrentPlayer] = useState('O');
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [winner, setWinner] = useState(false);
    const [reset, setReset] = useState(false);

    console.log(props);

    useEffect(()=> {
        setWinner(false);
        setSelectedColumn(null);
        setSelectedRow(null);

        const row = new Array(matrixSize).fill(null);

        const tempMatrix = [];

        for(let i = 0; i < matrixSize; i++) {
            tempMatrix.push([...row]);
        }

        setMatrix(tempMatrix);
        //console.log('rerender');

    }, [reset, matrixSize]);

    useEffect(()=> {
        if(matrixSize !== props.matrixSize) {
            setMatrixSize(props.matrixSize);
        }
        console.log('rerender');

    });

    const squareClick = (indRow, indCol) => {
        console.log(indRow, indCol);

        setSelectedColumn(indCol);
        setSelectedRow(indRow);

        if(!matrix[indRow][indCol] && !winner) {
            let nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setCurrentPlayer(nextPlayer);

            const matrixCopy = [...matrix];
            matrixCopy[indRow][indCol] = nextPlayer;
            setMatrix(matrixCopy);
        }
    };

    const isWinner = () => {
        let vertical = true;
        let horizontal = true;
        let diagonal1 = true;
        let diagonal2 = true;

        if (selectedColumn === null || selectedRow === null) {
            return;
        }

        for(let i = 0; i < matrixSize; i++) {
            if(matrix[i][selectedColumn] !== currentPlayer) {
                vertical = false;
            }

            if(matrix[selectedRow][i] !== currentPlayer) {
                horizontal = false;
            }

            if(matrix[i][i] !== currentPlayer) {
                diagonal1 = false;
            }

            if(matrix[i][matrixSize - i - 1] !== currentPlayer) {
                diagonal2 = false;
            }
        }

        if(vertical || horizontal || diagonal1 || diagonal2) {
            setWinner(true);
        }
    };

    useEffect(() => {
        if(!winner) {
            isWinner();
        }
    });

    const resetGame = () => {
        setReset(!reset);
    };

    const transformMark = (mark) => {
        let markPicture;
        switch(mark) {
            case 'X': markPicture = (<span class={`x-player player-mark ${theme}`}></span>) ;
            break;
            case 'O': markPicture = (<span class={`o-player player-mark ${theme}`}></span>);
            break;
            default: markPicture = null;
        }
        return markPicture;
    }

    return(
        <div>
            <button onClick= {()=>resetGame()}>Reset game</button>
            <div className="board_wrapper">
                {
                    matrix.map((value, indRow) => {
                        return (
                            <div className="board_row">
                                {value.map((val, indCol)=> {
                                    return (
                                        <div onClick={()=>squareClick(indRow, indCol)} className="board_column jumbotron">{transformMark(matrix[indRow][indCol])}</div>
                                    )
                                })}
                            </div>
                        )
                    })
                }                
            </div>

            <div>{winner ? `Player ${currentPlayer} is a winner! ` : ''}</div>
        </div>
    )
}

export default Board;