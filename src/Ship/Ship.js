// import '../css/Ship.css'; //Placeholder
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';

const keys = {
    'w':false, 'a':false, 's':false, 'd':false,
};

class Ship extends React.Component{

    constructor(props){
        super(props);
        this.state = {x: window.innerWidth/2, y: window.innerHeight/2, rotation: 0};

        this.xSpeed = 0;
        this.ySpeed = 0;
        this.acceleration = 1;
        this.rotationSpeed = 1;

        window.addEventListener('keydown', (e) => {
            Object.keys(keys).forEach(key => {
                if (e.key === key) {
                    keys[key] = true;
                    console.log(keys);
                }
            });
        })
        window.addEventListener('keyup', (e) => {
            Object.keys(keys).forEach(key => {
                if (e.key === key) {
                    keys[key] = false;
                    console.log(keys);
                }
            });
        })

        

        this.shipDiv = styled.div`
            color: red;
            transform: translate(${this.state.x}px, ${this.state.y}px) rotate(${5}deg);
            width: 100px;
            height: 100px;
            text-align: center;
            vertical-align: middle;
            display: table-cell;
            
        `
    }

    update(){
        
        if(keys.w)
        {
            
        }
        if(keys.a)
        {
            this.setState({rotation: this.state.rotation - this.rotationSpeed});
        }
        if(keys.s)
        {
            
        }
        if(keys.d)
        {
            this.setState({rotation: this.state.rotation + this.rotationSpeed});
        }

        this.setState({x: this.state.x + this.xSpeed});
        this.setState({x: this.state.y + this.ySpeed});

        this.shipDiv = styled.div`
            color: red;
            transform: translate(${this.state.x}px, ${this.state.y}px) rotate(${this.state.rotation}deg);
            width: 100px;
            height: 100px;
            text-align: center;
            vertical-align: middle;
            display: table-cell;
     

            
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