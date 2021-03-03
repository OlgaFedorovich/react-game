import React, {useState, useEffect} from 'react';
import './BestResultsPopup.css';

const BestResultsPopup = ({changeBestResultsVisibility}) => {
    const [bestResults, setBestResults] = useState([]);

    useEffect(()=> {
        let savedResults;
        if(localStorage.getItem('best-results')) {
           savedResults = JSON.parse(localStorage.getItem('best-results')); 
        }
        setBestResults(savedResults);
    }, []);

    const tableBody = bestResults 
                    ? (bestResults.map((result, ind) => {
                        return (
                            <tr key={ind} className={`${ind % 2 === 0 ? 'table-warning' : 'table-info'}`}>
                                <th scope="row">{ind+1}</th>
                                <td>{result.date}</td>
                                <td>{result.winner}</td>
                                <td>{result.moves}</td>
                                <td>{result.size}</td>
                                <td>{result.mode}</td>
                            </tr>
                        )
                    }))
                    : null;

    return (
        <div className="best-results-layout">
            <div className="table-wrapper">
                <button type="button" className="close" data-dismiss="alert" onClick={changeBestResultsVisibility}>&times;</button>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-light">
                            <th scope="col">№</th>
                            <th scope="col">Date</th>
                            <th scope="col">Winner</th>
                            <th scope="col">Moves</th>
                            <th scope="col">Board Size</th>
                            <th scope="col">Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>                
            </div>


        </div>
    )
};

export default BestResultsPopup;