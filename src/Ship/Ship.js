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
        addEventListener('keydown', (e) => {
            keys.forEach(key => {
                if (e.key === key) {
                    key = true;
                    console.log(`${key} down`);
                }
            });
        })
        addEventListener('keyup', (e) => {
            keys.forEach(key => {
                if (e.key === key) {
                    key = false;
                    console.log(`${key} up`);
                }
            });
        })
    }

    update(){
    }

    render(){
        return (
            <div>
                Jag är ett skepp!
            </div>
        )}

}

export default Ship;