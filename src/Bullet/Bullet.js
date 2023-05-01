//import '../css/Asteroid.css'; //Placeholder
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';



class Bullet extends React.Component{
    
    

    constructor(props) {
      super(props);
      
      
      this.rotationSpeed = 10;
      this.width = 10;
      this.height = 10;
      this.collisionRadius = 50;
      this.state = {x: props.x - this.width/2, y: props.y - this.height/2, rotation: props.rotation};
      this.speed = 10;
      this.xSpeed =  this.speed * Math.sin(this.state.rotation);
      this.ySpeed =  -this.speed * Math.cos(this.state.rotation);

      this.BulletDiv = styled.div`
      position: fixed;
      top: 0px;
      left: 0px;
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
      if(this.state.y > window.innerHeight) this.setState({y: 0});
      if(this.state.y < 0-this.height) this.setState({y: window.innerHeight});



      this.BulletDiv = styled.div`
      position: fixed;
      top: 0px;
      left: 0px;
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