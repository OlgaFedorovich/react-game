import React from 'react';
import './FooterNav.css';
import './../Header/Header.css';

const FooterNav = ({changeBestResultsVisibility, changeRulesInfoVisibility}) => {
    return(
        <footer className="game-footer">
            <div className="header-button btn btn-warning" onClick={changeBestResultsVisibility}>
                <i className="fa fa-trophy"></i>
            </div>

            <div className="header-button btn btn-info" onClick={changeRulesInfoVisibility}>
                <i className="fa fa-info"></i>
            </div>
          
        </footer>
    )
}

export default FooterNav;