import '../css/Asteroid.css'; //Placeholder
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';



class Asteroid extends React.Component{
    

    constructor(props) {
      super(props);
      this.state = {x: 100, y: 0};

    //   this.AsteroidDiv = styled.div`

    //   background-color: red;
    //   transform: translateX(${this.state.x}px);
    
    
    // `
    }
    update()
    {
      console.log("Jag är en uppdaterad asteroid");
      this.setState({x: this.state.x+1});
    }

    componentDidMount()
    {
      this.setState({x: 10000});
    }

      // update(){
      //   this.AsteroidDiv = styled.div`
      //   background-color: red;
      //   transform: translateX(${this.state.x}px);      

      // `
      // }


      render(){

        return (
          <div 
          className="asteroid"  
          onClick= { () => {
            this.state = {x: 1000};
            console.log(this.state.x);

            }}>
              {this.state.x}
          </div>
        );
      }



}



export default Asteroid;