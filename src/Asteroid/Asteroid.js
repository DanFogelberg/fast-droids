import '../css/Asteroid.css'; //Placeholder
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';



class Asteroid extends React.Component{
    
    

    constructor(props) {
      super(props);
      this.state = {x: 100, y: 0, rotation: 0};

      //Random values here
      this.xSpeed = 0.5;
      this.ySpeed = 0.5;
      this.rotationSpeed = 0.5;
      this.width = 100;
      this.height = 100;

      this.AsteroidDiv = styled.div`
      position: fixed;
      width: 100px;
      height: 100px;
      background-color: red;
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



      this.AsteroidDiv = styled.div`
      position: fixed;
      width: ${this.width}px;
      height: ${this.height}px;
      background-color: red;
      transform: translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg);
      
      
      `

      
    }

    componentDidMount()
    {
      //this.setState({x: 10000});
    }



      render(){

        return (
          <this.AsteroidDiv 
          className="asteroid"  
          >
             
          </this.AsteroidDiv>
        );
      }



}



export default Asteroid;