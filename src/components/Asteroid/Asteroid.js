import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';



class Asteroid extends React.Component{
    
    

    constructor(props) {
      super(props);

      let x;
      let y;

      if (Math.random() > 0.5) {
        x = 0 - props.size;
        y = Math.random()*window.innerHeight;
      } else {
        x = Math.random()*window.innerWidth;
        y = 0 - props.size;
      }

      this.state = {x: x , y: y ,rotation: Math.random()*360};

      //Random values here
      
      this.rotationSpeed = Math.random() * 1.5;
      this.width = props.size;
      this.height = props.size;
      this.collisionRadius = props.size/2;
      this.maxHp = Math.ceil(props.size/50);
      this.hp = this.maxHp;
      this.speed = props.velocity/10;
      this.xSpeed =  this.speed * Math.sin(this.state.rotation);
      this.ySpeed =  -this.speed * Math.cos(this.state.rotation);
      
      this.name = this.props.name; 

      this.AsteroidDiv = styled.div`
      position: fixed;
      top: 0px;
      left: 0px;
      width: ${this.width}px;
      height: ${this.height}px;
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: -1px 0 red, 0 1px red, 1px 0 red, 0 -1px red;

      > *{
        text-align: center;
        vertical-align: center;
        text-shadow: -1px 0 orange, 0 1px orange, 1px 0 orange, 0 -1px orange;
        
      }
      `
      this.hpColor = this.getHpColor(this.hp)
      this.positionStyle =
      {
        transform: 
        `
        translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}rad)
        `,
        backgroundColor: this.hpColor
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




      this.hpColor = this.getHpColor(this.hp);

      this.positionStyle =
      {
        transform: `translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg)`,
        backgroundColor: this.hpColor
      }

      
    }

    getHpColor(hp){
      
      if (hp == 1) return `rgb(255, 54, 0)`;
      if (hp == 2) return `rgb(255, 100, 0)`;
      if (hp == 3) return `rgb(255, 200, 0)`;
      if (hp == 4) return `rgb(200, 255, 0)`;
      if (hp == 5) return `rgb(100, 255, 0)`;
      if (hp == 6) return `rgb(0, 255, 220)`;
      if (hp > 6) return `rgb(0, 255, 255)`;
      
    }





      render(){

        return (
          <this.AsteroidDiv className="asteroid" style={this.positionStyle} > 
            <p>{this.name}</p>   
          </this.AsteroidDiv>
        );
      }



}



export default Asteroid;