import '../css/Asteroid.css'; //Placeholder
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';







class Asteroid extends React.Component{
    

    

    constructor(props) {
      super(props);
      this.state = ({x: 100, y: 0});

      this.AsteroidDiv = styled.div`

      background-color: red;
      transform: translateX(${this.state.x}px);
    
    
    `

        

        


      }

      update(){
        this.AsteroidDiv = styled.div`
        background-color: red;
        transform: translateX(${this.state.x}px);
      

      `

      }


      render(){

        return (
          <this.AsteroidDiv className="asteroid"  onClick= { () => this.state.x = 5}>
              {this.state.x}
          </this.AsteroidDiv>
        );
      }
      // style = {{transform: "translateX"(this.x)}} 

}



export default Asteroid;