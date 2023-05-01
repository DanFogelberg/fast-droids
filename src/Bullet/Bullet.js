import { useEffect, useState } from 'react';
import React from 'react';
import styled from 'styled-components';




let ships = [];
//let asteroids = [];

let test = false;

const Bullet = () => {
  
  const [test, setTest] = useState(0);
  const [position, setPosition] = useState({x: 0, y: 0});
  const speedX = 0.5;
  const speedY = 0.5;
  const rotation = 0;

  const width = 10;
  const height = 10;

  let bulletDiv = styled.div`
  width = ${width};
  height = ${height};
  `


  useEffect(() => {
    console.log("bullet");
  }, [])

  const update = () =>
  {
    setPosition({x: position.x+speedX, y: position.y+speedY});
    // this.setState({x: this.state.x + this.xSpeed});
    // this.setState({y: this.state.y + this.ySpeed});
    // this.setState({rotation: this.state.rotation + this.rotationSpeed})
    // if(this.state.rotation > 360) this.setState({rotation: this.state.rotation - 360})
    // if(this.state.rotation < -360) this.setState({rotation: this.state.rotation + 360})


    if(position.x > window.innerWidth) setPosition({x: 0-width});
    if(position.x < 0 - width) setPosition({x: window.innerWidth});
    if(position.y > window.innerHeight) setPosition({y: 0-height});
    if(position.y < 0-height) this.setPosition({y: window.innerHeight});



    bulletDiv = styled.div`
    position: fixed;
    width: ${this.width}px;
    height: ${this.height}px;
    background-color: red;
    transform: translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg);
    
    
    `
  }
    
    
  return <div className="bullet">
    
      HGEEJ
      
      

    </div>
};

export default Bullet;
