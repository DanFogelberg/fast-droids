// import '../css/Ship.css'; //Placeholder
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';

const keys = {
    'w':false, 'a':false, 's':false, 'd':false, 'space': false
};



class Ship extends React.Component{

    constructor(props){
        super(props);
              

        this.state = {x: window.innerWidth/2, y: window.innerHeight/2, rotation: 0}; //Rotation in rad
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.acceleration = 0.5;
        this.rotationSpeed = 0.1;
        this.width = 50;
        this.height = 50;
        this.speedDecay = 0.95;
        this.collisionRadius = 25;

        window.addEventListener('keydown', (e) => {
            Object.keys(keys).forEach(key => {
                if (e.key === key) {
                    keys[key] = true;
                }
            });
        })
        window.addEventListener('keyup', (e) => {
            Object.keys(keys).forEach(key => {
                if (e.key === key) {
                    keys[key] = false;
                }
            });
        })

        

        this.shipDiv = styled.div`
            color: red;
            width: ${this.width}px;
            height: ${this.height}px;
            transform: translate(${this.state.x}px, ${this.state.y}px) rotate${this.state.rotation}rad); 
            text-align: center;
            vertical-align: middle;
            display: table-cell;

        `
    }

    update(){
        
        if(keys.w)
        {
            
            this.props.addBullet(this.state.x + this.width/2,this.state.y + this.height/2);

            this.xSpeed =  this.xSpeed + this.acceleration * Math.sin(this.state.rotation);
            this.ySpeed =  this.ySpeed - this.acceleration * Math.cos(this.state.rotation);
        }
        if(keys.a)
        {
            this.setState({rotation: this.state.rotation - this.rotationSpeed});
        }
        if(keys.s)
        {
            this.xSpeed =  this.xSpeed - this.acceleration * Math.sin(this.state.rotation);
            this.ySpeed =  this.ySpeed + this.acceleration * Math.cos(this.state.rotation);
        }
        if(keys.d)
        {
            this.setState({rotation: this.state.rotation + this.rotationSpeed});
        }

        
        this.setState({x: this.state.x + this.xSpeed});
        this.setState({y: this.state.y + this.ySpeed});
        this.xSpeed = this.xSpeed * this.speedDecay;
        this.ySpeed = this.ySpeed * this.speedDecay;

        //Screenw wrapping
        if(this.state.x > window.innerWidth) this.setState({x: 0-this.width});
        if(this.state.x < 0-this.width) this.setState({x: window.innerWidth});
        if(this.state.y > window.innerHeight) this.setState({y: 0-this.height});
        if(this.state.y < 0-this.height) this.setState({y: window.innerHeight});


        this.shipDiv = styled.div`
            
            display: table-cell;
            color: red;
            width: ${this.width}px;
            height: ${this.height}px;
            transform: translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}rad);
            
            text-align: center;
            vertical-align: middle;     
        `
    }

    render(){
        return (
            <this.shipDiv>
                ^
            </this.shipDiv>
        )}

}

export default Ship;