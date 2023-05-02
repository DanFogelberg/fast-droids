import Asteroid from '../Asteroid/Asteroid';
import Bullet from '../Bullet/Bullet';
import Ship from '../Ship/Ship';
import Score from '../Score/Score';
import Menu from '../Menu/Menu';
import '../css/Game.css'; //Placeholder
import { useEffect, useState } from 'react';
import React from 'react';

let showMenu = true;
let ships = [];
let score = 0;

let test = false;

const Game = () => {
  const [running, setRunning] = useState(false);
  const [test, setTest] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [bullets, setBullets] = useState([]);

 

  useEffect(() => {

    addShip();
    addAsteroid();
    addAsteroid(200, 50, "blue", 4);
    addAsteroid(666, 666, "white", 30);
    addAsteroid();

    
    
    if(running === false)
    {
      setRunning(true);
      gameLoop();
    }
  }, [])

    
  const addAsteroid = (width = 50, height = 50, color = "red", hp = 1) =>
  {
    
    asteroids.push({ref: React.createRef(), props: {width, height, color, hp}})
    setAsteroids(asteroids);
    //Since this is a functional component the game loop will run on the old array if I create a new one instead of mutate it. This is a way to force a rerender since react doesn't react to mutating arrays. This should probably once again be remade back into a class component...
 
   
    
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


   
    
  }
    
  
  const gameLoop = () =>
    setTest(test+1);  //This is real bad code, but needed to re-render changes to arrays until I turn this back into a class component again
    {       
    asteroids.forEach(asteroid => 
    {
      if(asteroid.ref.current) asteroid.ref.current.update();
    });

    ships.forEach(ship => {
      if(ship.current) ship.current.update();
    }) 

    bullets.forEach((bullet, bulletId) => 
    {
      if(bullet.ref.current) 
      {
        bullet.ref.current.update();
        if(bullet.ref.current.lifeTime <= 0)
        {
          delete bullets[bulletId];
          setBullets(bullets);
        }
      }
    })


    //Check collisions
    asteroids.forEach((asteroid, asteroidId) => 
    {
      ships.forEach((ship, shipId) => 
      {
        if(asteroid.ref.current && ship.current){
          const asteroidCenterX = asteroid.ref.current.state.x+asteroid.ref.current.width/2;
          const asteroidCenterY = asteroid.ref.current.state.y+asteroid.ref.current.height/2;
          const shipCenterX = ship.current.state.x+ship.current.width/2;
          const shipCenterY = ship.current.state.y+ship.current.height/2;
          const collisionDistance = asteroid.ref.current.collisionRadius + ship.current.collisionRadius;

          const distanceX = Math.abs(asteroidCenterX - shipCenterX);
          const distanceY = Math.abs(asteroidCenterY - shipCenterY);
          const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
          if(distance <= collisionDistance)
          {
              //Delete is used to keep indexes intact. Indexes keep track of the keys of asteroid components
              
              //Since this is a functional component the game loop will run on the old array if I create a new one instead of mutate it. This is a way to force a rerender since react doesn't react to mutating arrays. This should probably once again be remade back into a class component...
             
          }
        }
       
      })
      bullets.forEach((bullet, bulletId) => 
      {
        
        if(asteroid.ref.current && bullet.ref.current)
        {
          const asteroidCenterX = asteroid.ref.current.state.x+asteroid.ref.current.width/2;
          const asteroidCenterY = asteroid.ref.current.state.y+asteroid.ref.current.height/2;
          const bulletCenterX = bullet.ref.current.state.x+bullet.ref.current.width/2;
          const bulletCenterY = bullet.ref.current.state.y+bullet.ref.current.height/2;
          const collisionDistance = asteroid.ref.current.collisionRadius + bullet.ref.current.collisionRadius;

          const distanceX = Math.abs(asteroidCenterX - bulletCenterX);
          const distanceY = Math.abs(asteroidCenterY - bulletCenterY);
          const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
          
          
          if(distance <= collisionDistance)
          {
            asteroid.ref.current.hp--;
            if(asteroid.ref.current.hp <= 0)
            {
              score += asteroid.ref.current.maxHp * 100;
              console.log(score);
              delete asteroids[asteroidId];
              setAsteroids(asteroids);
            }

            
            delete bullets[bulletId];
            setBullets(bullets);
            //Delete is used to keep indexes intact. Indexes keep track of the keys of asteroid components
              
              //Since this is a functional component the game loop will run on the old array if I create a new one instead of mutate it. This is a way to force a rerender since react doesn't react to mutating arrays. This should probably once again be remade back into a class component...
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
      <Score score={score}/>
    
      {asteroids.map((asteroid, asteroidId) => {        
        if(asteroid)return <Asteroid ref={asteroid.ref} key={asteroidId} {...asteroid.props} />  
      })}
       
      {ships.map((ship, shipId) => {
        return <Ship ref={ship} key={shipId+1000} addBullet = {addBullet}/>  
      })}

      
      {bullets.map((bullet, bulletId) => {
        return <Bullet ref={bullet.ref} key={bulletId+1100} {...bullet.props}/>  
      })}

      { showMenu && <Menu/> }  
      
      
      

    </div>
};
export default Game;