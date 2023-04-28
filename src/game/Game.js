import Asteroid from '../Asteroid/Asteroid';
import Ship from '../Ship/Ship';
import '../css/Game.css'; //Placeholder
import { useEffect } from 'react';
import React from 'react';
import { createContext } from 'react';

let frame = createContext(0);

let running = false;

let asteroids = [];
let asteroid = React.createRef();
let ship = React.createRef();

class Game extends React.Component{
    
  constructor(props) {
    super(props)

    this.asteroid = React.createRef();
    this.addAsteroid();
    this.addAsteroid();

    if(running == false)
    {
      running = true;
      this.gameLoop();
    }
  }

  addAsteroid()
  {
    asteroids.push(React.createRef());
  }





  gameLoop()
  {
    asteroids.forEach(asteroid => 
    {
      if(asteroid.current) asteroid.current.update();
    });

    if(ship.current) ship.current.update();

    requestAnimationFrame(() => 
    {
      this.gameLoop()
    });
  }

  render(){
    return <div className="game">
        
      {/* {asteroids.map((asteroid) => {
        return <Asteroid ref={asteroid}/>  
      })} */}
      
      <Ship ref={ship}/>

    </div>
  }
}

export default Game;
