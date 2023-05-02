import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';



class Asteroid extends React.Component{
    
    

    constructor(props) {
      super(props);
      this.state = {x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, rotation: Math.random()*3.14};

      //Random values here
      
      this.rotationSpeed = Math.random() * 1;
      this.width = props.size;
      this.height = props.size;
      this.collisionRadius = props.size/2;
      this.maxHp = props.hp;
      this.hp = props.hp;
      this.speed = 1;
      this.xSpeed =  this.speed * Math.sin(this.state.rotation);
      this.ySpeed =  -this.speed * Math.cos(this.state.rotation);
     

      this.AsteroidDiv = styled.div`
      position: fixed;
      top: 0px;
      left: 0px;
      width: ${this.width}px;
      height: ${this.height}px;
      background-color: ${props.color};
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      > *{
        text-align: center;
        vertical-align: center;
        
      }
      `
      this.positionStyle =
      {
        transform: `translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}rad)`
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
          <this.AsteroidDiv className="asteroid" style={this.positionStyle} > 
            <p>{this.props.name}</p>   
          </this.AsteroidDiv>
        );
      }



}



export default Asteroid;