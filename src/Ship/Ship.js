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
        this.state = {x: window.innerWidth/2, y: window.innerHeight/2};
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
            transform: translate(${this.state.x}px, ${this.state.y}px);
            
        `
    }

    update(){
        
        if(keys.w)
        {
            this.setState({x: this.state.x + 5});
        }
        if(keys.a)
        {
            this.setState({x: this.state.x + 5});
        }
        if(keys.s)
        {
            this.setState({x: this.state.x + 5});
        }
        if(keys.d)
        {
            this.setState({x: this.state.x + 5});
        }

        this.shipDiv = styled.div`
            color: red;
            transform: translate(${this.state.x}px, ${this.state.y}px);
            
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