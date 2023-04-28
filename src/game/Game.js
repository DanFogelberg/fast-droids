import Asteroid from '../Asteroid/Asteroid';
import Ship from '../Ship/Ship';
import '../css/Game.css'; //Placeholder
import { useEffect } from 'react';
import React from 'react';
import { createContext } from 'react';

let frame = createContext(0);

let running = false;

let asteroid = React.createRef();
let ship = React.createRef();

class Game extends React.Component{
    
  constructor(props) {
    super(props)



    this.asteroid = React.createRef();


    this.asteroids = [];
    this.asteroids.push(new Asteroid());


    
    if(running == false)
    {
      running = true;
      this.gameLoop();
    }
    

  
  
    
  }






  gameLoop(){

    //this.asteroid.update();
    // console.log(this.asteroid.state.x);
    //this.forceUpdate();
    //if(self.asteroid.current)self.asteroid.current.update();
    console.log(asteroid)
    if(asteroid.current) asteroid.current.update();
    requestAnimationFrame(() => 
    {
      this.gameLoop()
    });

    // setTimeout(() => {
    //     this.gameLoop()
    // }, 30);
   
  }

  render(){
    return <div className="game">
      <Asteroid ref={asteroid}/>
      <Ship ref={ship}/>

  
      


      
      
    </div>
  }
}

export default Game;
