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

      this.AsteroidDiv = styled.div`
      width: 100px;
      background-color: red;
      transform: translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg);   
      `
    }
    update()
    {
      console.log("Jag är en uppdaterad asteroid");
      console.log(this);
      this.setState({x: this.state.x + this.xSpeed});
      this.setState({y: this.state.y + this.ySpeed});
      this.setState({rotation: this.state.rotation + this.rotationSpeed})

      this.AsteroidDiv = styled.div`
      width: 100px;
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
          onClick= { () => {
            this.state = {x: 1000};
            console.log(this.state.x);

            }}>
              {this.state.x}
          </this.AsteroidDiv>
        );
      }



}



export default Asteroid;