import React, {Component} from 'react';
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error icon"></img>
            <span className="boom">BOOM!</span>
            <span>it is terrible</span>
            <span>we fix it</span>
        </div>
    );
};

export default ErrorIndicator;