import React, {useState, useEffect, useContext, useCallback} from 'react';
import './Board.css';
import {SettingsContext} from './../App/App';

const initMatrix = [];
const Board = (props) => {


    const {mode, matrixSize, move, theme} = useContext(SettingsContext);

    const {
        currentPlayer, 
        changeCurrentPlayer, 
        increaseMovesCount, 
        movesCount, 
        isNewGame, 
        changeStateOfGame,
        showFinalMessage} = props;

    console.log(isNewGame, 'game-status board');
    
    const [matrix, setMatrix] = useState(JSON.parse(localStorage.getItem('matrix')) || initMatrix);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [winner, setWinner] = useState(false);
    //const [usersMove, setUsersMove] = useState(JSON.parse(localStorage.getItem('users-move')) || true);
    const [usersMove, setUsersMove] = useState( JSON.parse(localStorage.getItem('users-move')) || (move ==="true" ? true : false));
    const [isDraw, setIsDraw] = useState(false);
    const [winningCells, setWinningCells] = useState([]);

    const startNewGame = useCallback(()=> {
        if(isNewGame) {
            console.log('new game');
            setMatrix(initMatrix);
            setWinner(false);
            setSelectedColumn(null);
            setSelectedRow(null);
            createNewMatrix(matrixSize); 
            setIsDraw(false);
            setUsersMove(move ==="true" ? true : false);
            setWinningCells([]);            
        }
    }, [matrixSize, mode, move]);

    const createNewMatrix = (matrixSize) => {
        const row = new Array(matrixSize).fill(null);
        const tempMatrix = [];
        for(let i = 0; i < matrixSize; i++) {
            tempMatrix.push([...row]);
        }
        setMatrix(tempMatrix);
        if(mode==="autoplay") {
            console.log(matrix, matrixSize, mode, move, usersMove)
        }  
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
        const savedBestResults = JSON.parse(localStorage.getItem('best-results')) || [];
        const currentResult = {
            moves: moves,
            winner: winner,
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
            showFinalMessage(winner, isDraw, movesCount, currentPlayer);

        } else {
            if (completedCells === matrixSize * matrixSize) {
                setIsDraw(true);
            }
        }
    };

    useEffect(()=> {
        if(!winner) {
            isWinner();
        }        
        
        console.log(move, 'move', usersMove, 'usersMove', isNewGame, 'isnewgame');

        if(isNewGame && mode==="computer") {
            if(move==="true" && usersMove === true) {
                //setUsersMove(true);
                localStorage.setItem('users-move', JSON.stringify(true));
                
            }

            if(move === "false" && usersMove === false) {
                //setUsersMove(false);
                localStorage.setItem('users-move', JSON.stringify(false));
                setRandomMark();
            }
        }

        if(!isNewGame && mode==="computer") {
            console.log(usersMove, 'users-move');
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

        // if(usersMove === true) {
        //     setUsersMove(false);
        //     localStorage.setItem('users-move', JSON.stringify(false));
        // }

        
            setUsersMove((usersMove) => !usersMove);
            //localStorage.setItem('users-move', JSON.stringify(false));
        
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


    // useEffect(()=> {
    //     if(!isNewGame && (winner || isDraw)) {
    //         showFinalMessage(winner, isDraw, movesCount);
    //     }
    // }, [winner, isDraw, isNewGame, showFinalMessage, movesCount])

    useEffect(()=> {
        localStorage.setItem('matrix', JSON.stringify(matrix));
    }, [matrix]);

 
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

    const checkWinningCell = (row, col) => {
        for(let i = 0; i<winningCells.length; i++) {

        }

        if(winningCells.length > 0) {
            console.log(row, col);
            const isWinningCell = winningCells.findIndex(cell => (cell[0] === row && cell[1] === col));

            console.log(isWinningCell, 'winningCell');
            return isWinningCell;
        }  
    }

    return(
        <div>
            <button onClick= {() =>{changeStateOfGame(true)}} >Reset game</button>
            <div className="board_wrapper">
                {
                    matrix.map((value, indRow) => {
                        return (
                            <div className="board_row">
                                {value.map((val, indCol)=> {
                                    return (
                                        <div 
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

            <div>{winner ? `Player ${currentPlayer} is a winner! ` : ''}</div>
            <div>{isDraw ? `Nobody had won! ` : ''}</div>
        </div>
    )
}

export default Board;