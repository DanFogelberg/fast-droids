import Asteroid from '../Asteroid/Asteroid';
import Bullet from '../Bullet/Bullet';
import Ship from '../Ship/Ship';
import '../css/Game.css'; //Placeholder
import { useEffect, useState } from 'react';
import React from 'react';









let ships = [];
//let asteroids = [];

let test = false;

const Game = () => {
  const [running, setRunning] = useState(false);
  const [test, setTest] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [bullets, setBullets] = useState([]);

  useEffect(() => {

    addShip();
    addAsteroid();
    addAsteroid();
    addAsteroid();
    addAsteroid();
    addBullet();
    addBullet();
    addBullet();
    
    
    if(running === false)
    {
      setRunning(true);
      gameLoop();
    }
  }, [])
  // this.state = {reRender: false, asteroids: []};
    
  const addAsteroid = () =>
  {
    asteroids.push(React.createRef());
    setAsteroids(asteroids);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // The following should do the same thing as far as I can tell, and would be better syntax. But doesn't. ///////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const newAsteroid = React.createRef();
    // setAsteroids(
    //   [
    //     ...asteroids, React.createRef()
    //   ]
    // );
   
   
    
  }

  const addShip = () =>
  {
     ships.push(React.createRef());
  }

  const addBullet = () => 
  {
    bullets.push(React.createRef());
    setBullets(bullets);
  }
    
  
  const gameLoop = () =>
    {       
    asteroids.forEach(asteroid => 
    {
      if(asteroid.current) asteroid.current.update();
    });

    ships.forEach(ship => {
      if(ship.current) ship.current.update();
    }) 

    bullets.forEach(bullet => 
    {
      if(bullet.current) bullet.current.update();
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
              //Delete is used to keep indexes intact. Indexes keep track of the keys of asteroid components
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

      
      {bullets.map((bullet, bulletId) => {
        return <Bullet ref={bullet} key={bulletId+1100}/>  
      })}
      
      

    </div>
};






    


  




  




export default Game;
