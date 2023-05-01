//import '../css/Asteroid.css'; //Placeholder
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';



class Bullet extends React.Component{
    
    

    constructor(props) {
      super(props);
      this.state = {x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, rotation: 0};

      //Random values here
      this.xSpeed = 0.5;
      this.ySpeed = 0.5;
      this.rotationSpeed = 10;
      this.width = 10;
      this.height = 10;
      this.collisionRadius = 50;
     

      this.BulletDiv = styled.div`
      position: fixed;
      width: ${this.width}px;
      height: ${this.height}px;
      background-color: orange;
      transform: translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg);
         
      `
    }
    update()
    {
      
      this.setState({x: this.state.x + this.xSpeed});
      this.setState({y: this.state.y + this.ySpeed});
      this.setState({rotation: this.state.rotation + this.rotationSpeed})
      if(this.state.rotation > 360) this.setState({rotation: this.state.rotation - 360})
      if(this.state.rotation < -360) this.setState({rotation: this.state.rotation + 360})


      if(this.state.x > window.innerWidth) this.setState({x: 0-this.width});
      if(this.state.x < 0-this.width) this.setState({x: window.innerWidth});
      if(this.state.y > window.innerHeight) this.setState({y: 0-this.height});
      if(this.state.y < 0-this.height) this.setState({y: window.innerHeight});



      this.BulletDiv = styled.div`
      position: fixed;
      width: ${this.width}px;
      height: ${this.height}px;
      background-color: orange;
      transform: translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg);
      
      
      `

      
    }





      render(){

        return (
          <this.BulletDiv></this.BulletDiv>
        );
      }



}



export default Bullet;