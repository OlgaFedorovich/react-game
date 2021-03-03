import React from 'react';
import './RulesInfoPopup.css';

const RulesInfoPopup = ({changeRulesInfoVisibility}) => {
    return (
        <div className="rules-info-layout">
            <div className="card border-info rules-info-wrapper mb-3">
                <button type="button" className="close" data-dismiss="alert" onClick={changeRulesInfoVisibility}>&times;</button>
                <h3 className="card-header">Rules and Info</h3>
                <div className="card-body">
                    <h5 className="card-title">Video about rules and usage of App</h5>
                </div>
                <iframe className="info-video" src="https://www.youtube.com/embed/Ji-2KRitm9k" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                <h5 className="card-title">Hot keys to control game</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span>Start new game</span><span>CTRL + G</span></li>
                    <li className="list-group-item"><span>Open settings</span><span>CTRL + S</span></li>
                    <li className="list-group-item"><span>Open best results</span><span>CTRL + R</span></li>
                    <li className="list-group-item"><span>Discover game's rules and info</span><span>CTRL+I</span></li>
                    <li className="list-group-item"><span>Manage sounds settings</span><span>CTRL + A</span></li>
                </ul>
                <div className="card-body">
                    <a  target="_blank" rel="noreferrer" href="https://ru.wikipedia.org/wiki/%D0%9A%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B8-%D0%BD%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8#:~:text=%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D0%B8%D0%B3%D1%80%D1%8B,-%D0%92%D1%8B%D0%B8%D0%B3%D1%80%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F%20%D0%BF%D0%B0%D1%80%D1%82%D0%B8%D1%8F%20%D0%B2&text=%D0%98%D0%B3%D1%80%D0%BE%D0%BA%D0%B8%20%D0%BF%D0%BE%20%D0%BE%D1%87%D0%B5%D1%80%D0%B5%D0%B4%D0%B8%20%D1%81%D1%82%D0%B0%D0%B2%D1%8F%D1%82%20%D0%BD%D0%B0,%D1%85%D0%BE%D0%B4%20%D0%B4%D0%B5%D0%BB%D0%B0%D0%B5%D1%82%20%D0%B8%D0%B3%D1%80%D0%BE%D0%BA%2C%20%D1%81%D1%82%D0%B0%D0%B2%D1%8F%D1%89%D0%B8%D0%B9%20%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B8." className="card-link">Read more about rules</a>
                </div>

            </div>
        </div>

    )
}

export default RulesInfoPopup;