import React, {useState, useEffect, useContext, useCallback} from 'react';
import './Board.css';
import {SettingsContext} from './../App/App';

const initMatrix = [];
const Board = (props) => {

    const {mode, level, move, theme} = useContext(SettingsContext);

    const {currentPlayer, changeCurrentPlayer, increaseMovesCount, resetMovesCount, movesCount} = props;
    let matrixSize = +level;
    
    const [matrix, setMatrix] = useState(initMatrix);
    //const [currentPlayer, setCurrentPlayer] = useState('O');
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [winner, setWinner] = useState(false);
    const [newGame, setNewGame] = useState(true);
    const [usersMove, setUsersMove] = useState(true);

    useEffect(()=> {
        if(newGame === true) {
            setMatrix(initMatrix);
            setWinner(false);
            setSelectedColumn(null);
            setSelectedRow(null);
            
            const row = new Array(matrixSize).fill(null);

            const tempMatrix = [];

            for(let i = 0; i < matrixSize; i++) {
                tempMatrix.push([...row]);
            }

            setMatrix(tempMatrix);            
        }
    }, [newGame, matrixSize]);

    useEffect(()=> {
        setNewGame(true);
    }, [mode, level, move, matrixSize]);

    useEffect(()=> {
        if(newGame === true) {
            resetMovesCount();
        }
    }, [newGame, resetMovesCount]);


    // useEffect(() => {
    //     if(mode === 'computer') {
    //         if


    //     }


    // }, [usersMove, mode]);

    const squareClick = (indRow, indCol) => {
        console.log(indRow, indCol);

        setSelectedColumn(indCol);
        setSelectedRow(indRow);

        if(!matrix[indRow][indCol] && !winner) {
            increaseMovesCount();
            let nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
            // setCurrentPlayer(nextPlayer);
            changeCurrentPlayer(nextPlayer);
            const matrixCopy = [...matrix];
            matrixCopy[indRow][indCol] = nextPlayer;
            setMatrix(matrixCopy);
        }

        if(newGame === true) {
            setNewGame(false);
        }
    };

    useEffect(() => {
        if(mode === 'computer') {
            let canUserMove;

            if( move==="false") {
                canUserMove = movesCount % 2 === 0 ? false : true; 
            }

            if(move==="true") {
                canUserMove = movesCount % 2 === 0 ? true : false; 
            }

            if(canUserMove === false && !winner) {
                const randomMark = () => {
                    const indRow = Math.floor(Math.random() * ((matrixSize-1) - 0 + 1)) + 0;
                    const indCol = Math.floor(Math.random() * ((matrixSize-1) - 0 + 1)) + 0;
                    console.log(indRow, indCol);

                    if(!matrix[indRow][indCol]) {
                        squareClick(indRow, indCol);
                        setUsersMove(true);
                    } else randomMark();
                };
                randomMark();
            }

            setUsersMove(canUserMove);            
        }

    }, [movesCount, mode, move]);



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

    useEffect(()=> {
        localStorage.setItem('matrix', JSON.stringify(matrix));
    }, [matrix]);

    useEffect(() => {
        if(!winner) {
            isWinner();
        }
    }, [currentPlayer]);

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
            <button onClick= {() =>{setNewGame(true)}} >Reset game</button>
            <div className="board_wrapper">
                {
                    matrix.map((value, indRow) => {
                        return (
                            <div className="board_row">
                                {value.map((val, indCol)=> {
                                    return (
                                        <div onClick={()=>{
                                            if(!usersMove) return;
                                            squareClick(indRow, indCol);
                                        }
                                        } className="board_column jumbotron">{transformMark(matrix[indRow][indCol])}</div>
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