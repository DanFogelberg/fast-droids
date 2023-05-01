import '../css/Asteroid.css'; //Placeholder
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';



class Asteroid extends React.Component{
    
    

    constructor(props) {
      super(props);
      this.state = {x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, rotation: 0};

      //Random values here
      this.xSpeed = 0.5;
      this.ySpeed = 0.5;
      this.rotationSpeed = 0.5;
      this.width = props.width;
      this.height = props.height;
      this.collisionRadius = props.width/2;
      this.hp = props.hp;
     

      this.AsteroidDiv = styled.div`
      position: fixed;
      top: 0px;
      left: 0px;
      width: ${this.width}px;
      height: ${this.height}px;
      background-color: ${props.color};
      `
      this.positionStyle =
      {
        transform: `translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg)`
      }
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




      this.positionStyle =
      {
        transform: `translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg)`
      }

      
    }





      render(){

        return (
          <this.AsteroidDiv 
          className="asteroid" style={this.positionStyle} 
          >
             
          </this.AsteroidDiv>
        );
      }



}



export default Asteroid;