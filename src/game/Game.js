import Asteroid from '../Asteroid/Asteroid';
import '../css/Game.css'; //Placeholder
import { useEffect } from 'react';
import React from 'react';

const asteroid = new Asteroid();

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
    </div>
  }
}

export default Game;
