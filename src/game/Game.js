import logo from '../logo.svg';
import Asteroid from '../Asteroid/Asteroid';
import '../css/Game.css'; //Placeholder
import { useEffect } from 'react';

const asteroid = new Asteroid();



function Game() {

  const gameLoop = () => {

    

    console.log('new frame');
    setTimeout(gameLoop, 1000);

  }

  useEffect(gameLoop, []);


  return (
    <div className="game">
      {asteroid}
    </div>
  );
}

export default Game;
