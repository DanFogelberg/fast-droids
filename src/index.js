import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game/Game';
//import Menu from './Menu/Menu';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const game = new Game();




// const gameLoop = () => {
//   game.gameLoop();
//   setTimeout(gameLoop, 100);

// }
// gameLoop();

root.render(
  <React.StrictMode>
   <Game />
    {/* <Menu /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
