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
    addBullet(10,105,100);
    addBullet(50, 50, 20);
    addBullet(10,10,10);
    
    
    if(running === false)
    {
      setRunning(true);
      gameLoop();
    }
  }, [])
  // this.state = {reRender: false, asteroids: []};
    
  const addAsteroid = () =>
  {
    
    asteroids.push(React.createRef())
    setAsteroids(asteroids);
    //Since this is a functional component the game loop will run on the old array if I create a new one instead of mutate it. This is a way to force a rerender since react doesn't react to mutating arrays. This should probably once again be remade back into a class component...
    setTest(test+1); 
   
    
  }

  const addShip = () =>
  {
     ships.push(React.createRef());
  }

  const addBullet = (x, y, rotation) => 
  {
    bullets.push({ref:React.createRef(), props:{x, y, rotation}});
    const newBullets = bullets;
    setBullets(newBullets);
    //Since this is a functional component this function will not loop on an object. That means it will not have access to the components states. As such I cannot make new arrays for the state array, as this function will still access the old array. I also can't force a rerender by updating any states, as this function no longer can access them. Need to change it back to a class function again
    
    
    setTest(test+1); 
   
    
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
      if(bullet.ref.current) bullet.ref.current.update();
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
              setAsteroids(asteroids);
              //Since this is a functional component the game loop will run on the old array if I create a new one instead of mutate it. This is a way to force a rerender since react doesn't react to mutating arrays. This should probably once again be remade back into a class component...
              setTest(test+1); 
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
        return <Ship ref={ship} key={shipId+1000} addBullet = {addBullet}/>  
      })}

      
      {bullets.map((bullet, bulletId) => {
        return <Bullet ref={bullet.ref} key={bulletId+1100} {...bullet.props}/>  
      })}
      
      

    </div>
};






    


  




  




export default Game;
