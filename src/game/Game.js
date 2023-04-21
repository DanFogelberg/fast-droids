import Asteroid from '../Asteroid/Asteroid';
import Ship from '../Ship/Ship';
import '../css/Game.css'; //Placeholder
import { useEffect } from 'react';
import React from 'react';

const asteroid = new Asteroid();
const ship = new Ship();
class Game extends React.Component{
    
  constructor(props) {
    super(props)
    
  }




  gameLoop(){

    asteroid.update();
    console.log(asteroid.state.x);
    setTimeout(this.gameLoop, 1000);
   
  }

  render(){
    return <div className="game">
      {asteroid.render()}
      {ship.render()}
    </div>
  }
}

export default Game;
