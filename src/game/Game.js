import Asteroid from '../Asteroid/Asteroid';
import Bullet from '../Bullet/Bullet';
import Ship from '../Ship/Ship';
import Score from '../Score/Score';
import Menu from '../Menu/Menu';
import '../css/Game.css'; //Placeholder
import { useEffect, useState } from 'react';
import React from 'react';
import api from '../helper/api';


let showMenu = true;
let ships = [];
let score = 0;

let game;





class Game extends React.Component{
  constructor(props) {
    super(props);
    this.state = {running: false, test: 0, asteroids: [], bullets: []};
    this.addShip()

    game = this;

    api('2023-05-01').then((result) => {
      result.forEach(asteroid => {
        this.addAsteroid(asteroid.name, asteroid.dia, asteroid.velocity )
      });

      

    });

    if(this.state.running === false)
    { 
      this.gameLoop();
    };
  }
  addAsteroid(name = " ", size = 50, velocity = 10)
  {
    let newAsteroidsArray = this.state.asteroids;
    newAsteroidsArray.push({ref: React.createRef(), props: {name, size, velocity}});
    this.setState({asteroids: newAsteroidsArray});    
  }
  addShip()
  {
     ships.push(React.createRef());
  }
  addBullet(x, y, rotation)
  {
    //Using game since this is called from ship and "this" thus will refer to ship.
    let newBullets = game.state.bullets;
    newBullets.push({ref:React.createRef(), props:{x, y, rotation}});
    game.setState({bullets: newBullets})



   
    
  }

  gameLoop()  
  {
    this.state.asteroids.forEach(asteroid => 
    {
      if(asteroid.ref.current) asteroid.ref.current.update();
    });

    ships.forEach(ship => {
      if(ship.current) ship.current.update();
    }) 

    this.state.bullets.forEach((bullet, bulletId) => 
    {
      if(bullet.ref.current) 
      {
        bullet.ref.current.update();
        if(bullet.ref.current.lifeTime <= 0)
        {
          let newBulletArray = this.state.bullets;
          delete newBulletArray[bulletId];
          this.setState({bullets: newBulletArray})
        }
      }
    })
  


    //Check collisions
    this.state.asteroids.forEach((asteroid, asteroidId) => 
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
              //Delete ship here!
              
             
          }
        }
       
      })
      this.state.bullets.forEach((bullet, bulletId) => 
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
          
              let newAsteroidsArray = this.state.asteroids;
              delete newAsteroidsArray[asteroidId];
              this.setState({asteroids: newAsteroidsArray});
            }

            let newBulletArray = this.state.bullets;
            delete newBulletArray[bulletId]; //Delete is used to keep indexes intact. Indexes keep track of the keys of asteroid components
            this.setState({bullets: newBulletArray})
          }
        }
      })
      

    })

    requestAnimationFrame(() => 
    {
      this.gameLoop()
    });
  }



  render()
  {
    return <div className="game">
      <Score score={score}/>
    
      {this.state.asteroids.map((asteroid, asteroidId) => {        
        if(asteroid)return <Asteroid ref={asteroid.ref} key={asteroidId} {...asteroid.props} />  
      })}
       
      {ships.map((ship, shipId) => {
        return <Ship ref={ship} key={shipId+1000} addBullet = {this.addBullet}/>  
      })}

      
      {this.state.bullets.map((bullet, bulletId) => {
        return <Bullet ref={bullet.ref} key={bulletId+1100} {...bullet.props}/>  
      })}

      { showMenu && <Menu/> }  
      
      
      

    </div>
  } 
}

export default Game;