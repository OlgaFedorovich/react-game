import React, {useState, useEffect, useContext, useCallback} from 'react';
import './Board.css';
import {SettingsContext} from '../Game/Game';

const initMatrix = [[null, null, null], [null, null, null], [null, null, null]];
const Board = (props) => {
    const {mode, matrixSize, move, theme, user, opponent} = useContext(SettingsContext);

    const {
        currentPlayer, 
        changeCurrentPlayer, 
        increaseMovesCount, 
        movesCount, 
        isNewGame, 
        changeStateOfGame,
        showFinalMessage,
        playSound,
        } = props;
    
    const [matrix, setMatrix] = useState(JSON.parse(localStorage.getItem('matrix')) || initMatrix);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [winner, setWinner] = useState(false);
    const [usersMove, setUsersMove] = useState( JSON.parse(localStorage.getItem('users-move')) || (move ==="true" ? true : false));
    const [isDraw, setIsDraw] = useState(false);
    const [winningCells, setWinningCells] = useState([]);

    const startNewGame = useCallback(()=> {
        if(isNewGame) {
            setMatrix(initMatrix);
            setWinner(false);
            setSelectedColumn(null);
            setSelectedRow(null);
            createNewMatrix(matrixSize); 
            setIsDraw(false);
            setUsersMove(move ==="true" ? true : false);
            setWinningCells([]);
            playSound('reset');
        }
    }, [matrixSize, mode, move]);

    const createNewMatrix = (matrixSize) => {
        const row = new Array(matrixSize).fill(null);
        const tempMatrix = [];
        for(let i = 0; i < matrixSize; i++) {
            tempMatrix.push([...row]);
        }
        setMatrix(tempMatrix);
    };

    const findWinningLine = (vertical, horizontal, diagonal1, diagonal2, selectedColumn, selectedRow) => {
        const linesArray= ['vertical', 'horizontal', 'diagonal1', 'diagonal2'];
        const winningLineIndex = [vertical, horizontal, diagonal1, diagonal2].findIndex(line => line===true);
        const winningLine = winningLineIndex !== -1 ? linesArray[winningLineIndex] : null;

        if(winningLine) {
            const winningPositionsArray = [];
            switch(winningLine) {
                case 'vertical': 
                    for (let i = 0; i <matrixSize; i++) {
                        winningPositionsArray.push([i, selectedColumn]);
                    }
                break;
                case 'horizontal':
                    for (let i = 0; i <matrixSize; i++) {
                            winningPositionsArray.push([selectedRow, i]);
                    }
                break;
                case 'diagonal1':
                    for (let i = 0; i <matrixSize; i++) {
                            winningPositionsArray.push([i, i]);
                    }
                break;
                case 'diagonal2':
                    for (let i = 0; i <matrixSize; i++) {
                            winningPositionsArray.push([i, matrixSize - i - 1]);  
                    }
                break;
                default: return;
            }
            if(winningPositionsArray.length !== 0) {
                setWinningCells(winningPositionsArray);
            }
        }
    };

    const addToBestResults = (moves, winner, size, mode) => {
        let winnerPlayer;
        if(move==="true") {
            winnerPlayer = winner === 'X'? user : opponent;
        } else {
        winnerPlayer = winner === 'O' ? user : opponent;
        } 

        const savedBestResults = JSON.parse(localStorage.getItem('best-results')) || [];
        const currentResult = {
            moves: moves,
            winner: winnerPlayer,
            size: size,
            mode: mode,
            date: new Date().toLocaleDateString()
        };

        savedBestResults.push(currentResult);
        const filteredBestResults = savedBestResults.sort((a, b) => a.moves - b.moves);
        const bestResultsToSave = filteredBestResults.length > 10 ? filteredBestResults.slice(0, 10) : filteredBestResults;
        localStorage.setItem('best-results', JSON.stringify(bestResultsToSave));
    }

    const isWinner = () => {
        let vertical = true;
        let horizontal = true;
        let diagonal1 = true;
        let diagonal2 = true;
        let completedCells = 0;

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

            for(let j=0; j<matrixSize; j++) {
                if(matrix[i][j]) {
                    completedCells +=1;
                }
            }
        }

        findWinningLine(vertical, horizontal, diagonal1, diagonal2, selectedColumn, selectedRow);

        if(vertical || horizontal || diagonal1 || diagonal2) {

            setWinner(true);
            addToBestResults(movesCount, currentPlayer, matrixSize, mode);
            showFinalMessage(true, currentPlayer);
            playSound('winning');

        } else {
            if (completedCells === matrixSize * matrixSize) {
                setIsDraw(true);
                showFinalMessage(false, currentPlayer);
                playSound('draw');
            }
        }
    };

    useEffect(()=> {
        if(!winner) {
            isWinner();
        }        
        
        if(isNewGame && mode==="computer") {
            if(move==="true" && usersMove === true) {
                localStorage.setItem('users-move', JSON.stringify(true));
            }

            if(move === "false" && usersMove === false) {
                localStorage.setItem('users-move', JSON.stringify(false));
                setRandomMark();
            }
        }

        if(!isNewGame && mode==="computer") {
            if(usersMove === false) {
                setRandomMark();
            }
        }

        let autoplayId;

        if(mode==="autoplay") {
            setUsersMove(false);
            localStorage.setItem('users-move', JSON.stringify(false));
            autoplayId = setTimeout(()=>setRandomMark(), 2000);
        }

        return ()=> clearTimeout(autoplayId);

    }, [matrix, usersMove]);

    useEffect(()=> {
        if(isNewGame === true && JSON.parse(localStorage.getItem('game-status')) === true) {
            startNewGame(); 
        }
    }, [isNewGame, startNewGame]);

    const squareClick = (indRow, indCol) => {
        playSound('click');
        setSelectedColumn(indCol);
        setSelectedRow(indRow);

        if(!matrix[indRow][indCol] && !winner) {
            increaseMovesCount();

            let nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
            changeCurrentPlayer(nextPlayer);

            const matrixCopy = [...matrix];
            matrixCopy[indRow][indCol] = nextPlayer;
            setMatrix(matrixCopy);
        }

        if(isNewGame === true) {
            changeStateOfGame(false);
        }

        setUsersMove((usersMove) => !usersMove);
 
    };

    useEffect(()=> {
        localStorage.setItem('users-move', JSON.stringify(usersMove));
    }, [usersMove]);

    const setRandomMark = useCallback(()=>  {
        const emptyCells = [];

        for(let i = 0; i < matrixSize; i++) {
            for(let j = 0; j <matrixSize; j++) {
                if(!matrix[i][j]) {
                   emptyCells.push([i, j]);
                } 
            }
        }

        if(emptyCells.length !== 0 && !winner) {       
            const randomCellNum = Math.floor(Math.random() * ((emptyCells.length-1-1) - 0 + 1)) + 0;
            const randomCell = emptyCells[randomCellNum];

            squareClick(randomCell[0], randomCell[1]);
            setUsersMove(true); 
            localStorage.setItem('users-move', JSON.stringify(true)); 
        }

    }, [matrixSize, matrix]);

    useEffect(()=> {
        localStorage.setItem('matrix', JSON.stringify(matrix));
    }, [matrix]);

 
    const transformMark = (mark) => {
        let markPicture;
        switch(mark) {
            case 'X': markPicture = (<span className={`x-player player-mark ${theme}`}></span>) ;
            break;
            case 'O': markPicture = (<span className={`o-player player-mark ${theme}`}></span>);
            break;
            default: markPicture = null;
        }
        return markPicture;
    }

    const checkWinningCell = (row, col) => {
        for(let i = 0; i<winningCells.length; i++) {
        }
        if(winningCells.length > 0) {
            const isWinningCell = winningCells.findIndex(cell => (cell[0] === row && cell[1] === col));
            return isWinningCell;
        }  
    }

    return(
        <div className="board-field">
            <button className="btn btn-info border-primary restart-button" onClick= {() =>{changeStateOfGame(true)}} >New game</button>
            <div className="board_wrapper">
                {
                    matrix.map((value, indRow) => {
                        return (
                            <div key={indRow} className="board_row">
                                {value.map((val, indCol)=> {
                                    return (
                                        <div key={indCol}
                                            onClick={()=>{
                                                if(!usersMove && mode === "computer") return;
                                                squareClick(indRow, indCol);
                                            }} 
                                            className={`board_column jumbotron
                                                ${checkWinningCell(indRow, indCol) >= 0 ? 'winning' : ''}
                                            `}>
                                            {transformMark(matrix[indRow][indCol])}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }                
            </div>
        </div>
    )
}

export default Board;