import Asteroid from '../Asteroid/Asteroid';
import Ship from '../Ship/Ship';
import '../css/Game.css'; //Placeholder
import { useEffect } from 'react';
import React from 'react';


let running = false;

let asteroids = [];
let ships = [];

class Game extends React.Component{
    
  constructor(props) {
    super(props)

    this.asteroid = React.createRef();
    this.addAsteroid();
    this.addAsteroid();
    this.addShip();

    if(running === false)
    {
      running = true;
      this.gameLoop();
    }
  }

  addAsteroid()
  {
    asteroids.push(React.createRef());
  }

  addShip()
  {
    ships.push(React.createRef());
  }





  gameLoop()
  {
    asteroids.forEach(asteroid => 
    {
      if(asteroid.current) asteroid.current.update();
    });

    ships.forEach(ship => {
      if(ship.current) ship.current.update();
    }) 


    //Check collisions
    asteroids.forEach(asteroid => 
    {
      ships.forEach(ship => 
      {
        if(asteroid.current && ship.current){
          const asteroidCenterX = asteroid.current.state.x+asteroid.current.width/2;
          const asteroidCenterY = asteroid.current.state.y+asteroid.current.height/2;
          const shipCenterX = ship.current.state.x+ship.current.width/2;
          const shipCenterY = ship.current.state.y+ship.current.height/2;
          const collisionDistance = asteroid.current.collisionRadius + ship.current.collisionRadius;

          const distanceX = Math.abs(asteroidCenterX - shipCenterX);
          const distanceY = Math.abs(asteroidCenterY - shipCenterY);
          const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
          if(distance <= collisionDistance)
          {
            
            console.log("Death");
          }
        }
      })

    })

    requestAnimationFrame(() => 
    {
      this.gameLoop()
    });
  }

  render(){
    return <div className="game">
       
      {asteroids.map((asteroid) => {
        return <Asteroid ref={asteroid}/>  
      })}
       
      {ships.map((ship) => {
        return <Ship ref={ship}/>  
      })}
      
      

    </div>
  }
}

export default Game;
