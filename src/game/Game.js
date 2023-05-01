import { unmountComponentAtNode } from 'react-dom';
import Asteroid from '../Asteroid/Asteroid';
import Ship from '../Ship/Ship';
import '../css/Game.css'; //Placeholder
import { useEffect, useState } from 'react';
import React from 'react';
import { ReactDOM } from 'react';





let running = false;


let ships = [];
//let asteroids = [];

let test = false;

const Game = ({ handleClick, children }) => {
  
  const [test, setTest] = useState(0);
  const [asteroids, setAsteroids] = useState([React.createRef(), React.createRef()]);

  useEffect(() => {
    addShip();
    //addAsteroid();
    //addAsteroid();
    
    
    if(running === false)
    {
      running = true;
      gameLoop();
    }
  }, [])
  // this.state = {reRender: false, asteroids: []};
    
  const addAsteroid = () =>
  {
   
    setAsteroids([...asteroids, React.createRef()]);
   
    
  }

  const addShip = () =>
  {
     ships.push(React.createRef());
  }
    
  
    const gameLoop = () =>
  {
    setTest(test+1);
    
  

    asteroids.forEach(asteroid => 
    {
      if(asteroid.current) asteroid.current.update();
    });

    ships.forEach(ship => {
      if(ship.current) ship.current.update();
    }) 


    //Check collisions
    asteroids.forEach((asteroid, asteroidId) => 
    {
      ships.forEach((ship, shipId) => 
      {
        if(asteroid.current && ship.current){
          const asteroidCenterX = asteroid.current.state.x+asteroid.current.width/2;
          const asteroidCenterY = asteroid.current.state.y+asteroid.current.height/2;
          const shipCenterX = ship.current.state.x+ship.current.width/2;
          const shipCenterY = ship.current.state.y+ship.current.height/2;
          const collisionDistance = asteroid.current.collisionRadius + ship.current.collisionRadius;

          const distanceX = Math.abs(asteroidCenterX - shipCenterX);
          const distanceY = Math.abs(asteroidCenterY - shipCenterY);
          const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
          if(distance <= collisionDistance)
          {
              delete asteroids[asteroidId];
              setAsteroids([...asteroids]);
          }
        }
      })

    })

    requestAnimationFrame(() => 
    {
      gameLoop()
    });
  }


  return <div className="game">
    
      {asteroids.map((asteroid, asteroidId) => {

       if(asteroid)return <Asteroid ref={asteroid} key={asteroidId} />  
      })}
       
      {ships.map((ship, shipId) => {
        return <Ship ref={ship} key={shipId+1000}/>  
      })}
      
      

    </div>
};






    


  




  




export default Game;
