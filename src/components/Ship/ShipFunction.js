// import '../css/Ship.css'; //Placeholder
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import styled from "styled-components";



let ShipDiv = styled.div`
  color: red;
  width: 20px;
  height: 20px;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  font-size: 20px;
`;

let positionStyle = {
  transform: `translate(${window.innerWidth/2}px, ${window.innerHeight/2}px) rotate(0deg)`,
};

const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  " ": false,
};

let fireKeyWasDown = false;
let xSpeed;
let ySpeed;

const Ship = (props) => {
  const [x, setX] = useState(window.innerWidth / 2);
  const [y, setY] = useState(window.innerHeight / 2);
  const [rotation, setRotation] = useState(0); //In rad.
  
  let frame = props.frame;
  const addBullet = props.addBullet;

  
  const acceleration = 0.5;
  const rotationSpeed = 0.1;
  const width = 20;
  const height = 20;
  const speedDecay = 0.95;
  const collisionRadius = 6;

  //Constructor.
  useEffect(() => {
    
    const addBullet = props.addBullet;
    xSpeed = 0;
    ySpeed = 0;
    
    
   

    //Eventlisteners for controls.
    window.addEventListener("keydown", (e) => {
      Object.keys(keys).forEach((key) => {
        if (e.key === key) {
          keys[key] = true;
        }
      });
    });
    window.addEventListener("keyup", (e) => {
      Object.keys(keys).forEach((key) => {
        if (e.key === key) {
          keys[key] = false;
        }
      });
    });



    

  }, []);

      //Update run on each frame.
      useEffect(() => 
      {
        console.log(xSpeed);
        if (keys.w) {
          xSpeed = xSpeed + acceleration * Math.sin(rotation);
          ySpeed = ySpeed - acceleration * Math.cos(rotation);
        }
        if (keys.a) {
          setRotation(rotation - rotationSpeed);
        }
        if (keys.s) {
          xSpeed = xSpeed - acceleration * Math.sin(rotation);
          ySpeed = ySpeed + acceleration * Math.cos(rotation);
        }
        if (keys.d) {
          setRotation(rotation + rotationSpeed);
        }
        if (keys[" "]) {
          if (fireKeyWasDown !== true) {
            fireKeyWasDown = true;
            addBullet(
              x + width / 2,
              y + height / 2,
              rotation
            );
          }
        } else fireKeyWasDown = false;

        setX(x + xSpeed);
        setY(y + ySpeed);
        xSpeed = xSpeed * speedDecay;
        ySpeed = ySpeed * speedDecay;

      if (x > window.innerWidth) setX(0 - width);
      if (x < 0 - width) setX(window.innerWidth);
      if (y > window.innerHeight) setY(0 - height);
      if (y < 0 - height) setY(window.innerHeight);
        
        positionStyle = {
          transform: `translate(${x}px, ${y}px) rotate(${rotation}rad)`,
        };
  
      },[props.frame, fireKeyWasDown])
  

  return <ShipDiv style={positionStyle}>^</ShipDiv>;

};

export default Ship;
