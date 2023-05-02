import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game/Game';
import reportWebVitals from './reportWebVitals';
import Asteroid from './Asteroid/Asteroid';
import api from './helper/api';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Game />
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
