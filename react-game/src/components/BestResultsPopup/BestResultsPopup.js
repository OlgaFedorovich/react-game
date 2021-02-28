import React, {useState, useEffect} from 'react';
import './BestResultsPopup.css';

const BestResultsPopup = ({changeBestResultsVisibility}) => {
    const [bestResults, setBestResults] = useState([]);
    console.log(bestResults);

    useEffect(()=> {
        let savedResults;
        if(localStorage.getItem('best-results')) {
           savedResults = JSON.parse(localStorage.getItem('best-results')); 
        }
        setBestResults(savedResults);
    }, []);

    return (
        <div className="best-results-layout">
            
            <table class="table table-hover">
            <button type="button" class="close" data-dismiss="alert" onClick={changeBestResultsVisibility}>&times;</button>
                <thead>
                    <tr class="table-light">
                        <th scope="col">№</th>
                        <th scope="col">Date</th>
                        <th scope="col">Winner</th>
                        <th scope="col">Moves</th>
                        <th scope="col">Board Size</th>
                        <th scope="col">Mode</th>
                    </tr>
                </thead>
                <tbody>
                    {bestResults.map((result, ind) => {
                        return (
                            <tr class={`${ind % 2 === 0 ? 'table-warning' : 'table-info'}`}>
                                <th scope="row">{ind+1}</th>
                                <td>{result.date}</td>
                                <td>{result.winner}</td>
                                <td>{result.moves}</td>
                                <td>{result.size}</td>
                                <td>{result.mode}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

        </div>

    )
};

export default BestResultsPopup;