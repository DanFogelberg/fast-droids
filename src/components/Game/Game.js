import Asteroid from "../Asteroid/Asteroid";
import Bullet from "../Bullet/Bullet";
import DateDisplay from "../Date/Date";
import Ship from "../Ship/Ship";
import ShipFunc from "../Ship/ShipFunction";
import Score from "../Score/Score";
import Menu from "../Menu/Menu";
import "../../css/Game.css"; //Placeholder
import { createRef, useEffect, useState } from "react";
import React from "react";
import api from "../../helper/api";

let ships = [];
let score = 0;

let game;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      asteroids: [],
      bullets: [],
      showMenu: true,
      date: "",
      frame: 0
    };
    this.asteroidsAmount = 0;


    game = this;

    //For menu background
    api("").then((result) => {
      result.forEach((asteroid) => {
        game.addAsteroid(asteroid.name, asteroid.dia, asteroid.velocity);
      });
    });

    if (this.state.running === false) {
      this.gameLoop();
    }
  }

  //Adding of game objects
  addAsteroid(name = " ", size = 50, velocity = 10) {
    let newAsteroidsArray = game.state.asteroids;
    newAsteroidsArray.push({
      ref: React.createRef(),
      props: { name, size, velocity },
    });
    game.setState({ asteroids: newAsteroidsArray });

    game.asteroidsAmount++;
  }
  addShip() {
    ships.push(React.createRef());
  }
  addBullet(x, y, rotation) {
    //Using game since this is called from ship and "this" thus will refer to ship.
    let newBullets = game.state.bullets;
    newBullets.push({ ref: React.createRef(), props: { x, y, rotation } });
    game.setState({ bullets: newBullets });
  }

  gameLoop() {
    //This if statement is a bad workaround. Should be fixed when made into functional component.
    if(this.state.frame !== 0) this.setState({frame: this.state.frame+1}); 
    else this.state.frame++;

    this.state.asteroids.forEach((asteroid) => {
      if (asteroid.ref.current) asteroid.ref.current.update();
    });

    ships.forEach((ship) => {
      if (ship.current) ship.current.update();
    });

    this.state.bullets.forEach((bullet, bulletId) => {
      if (bullet.ref.current) {
        bullet.ref.current.update();
        if (bullet.ref.current.lifeTime <= 0) {
          let newBulletArray = this.state.bullets;
          delete newBulletArray[bulletId];
          this.setState({ bullets: newBulletArray });
        }
      }
    });

    //Check collisions
    this.state.asteroids.forEach((asteroid, asteroidId) => {
      ships.forEach((ship, shipId) => {
        if (asteroid.ref.current && ship.current) {
          const asteroidCenterX =
            asteroid.ref.current.state.x + asteroid.ref.current.width / 2;
          const asteroidCenterY =
            asteroid.ref.current.state.y + asteroid.ref.current.height / 2;
          const shipCenterX = ship.current.state.x + ship.current.width / 2;
          const shipCenterY = ship.current.state.y + ship.current.height / 2;
          const collisionDistance =
            asteroid.ref.current.collisionRadius + ship.current.collisionRadius;

          const distanceX = Math.abs(asteroidCenterX - shipCenterX);
          const distanceY = Math.abs(asteroidCenterY - shipCenterY);
          const distance = Math.sqrt(
            Math.pow(distanceX, 2) + Math.pow(distanceY, 2)
          );
          //Destroy ship and lose game!
          if (distance <= collisionDistance) {
            delete ships[shipId];
            this.setState({ test: this.state.test + 1 });
            score = 0;

            this.setState({ showMenu: true });
          }
        }
      });
      this.state.bullets.forEach((bullet, bulletId) => {
        if (asteroid.ref.current && bullet.ref.current) {
          const asteroidCenterX =
            asteroid.ref.current.state.x + asteroid.ref.current.width / 2;
          const asteroidCenterY =
            asteroid.ref.current.state.y + asteroid.ref.current.height / 2;
          const bulletCenterX =
            bullet.ref.current.state.x + bullet.ref.current.width / 2;
          const bulletCenterY =
            bullet.ref.current.state.y + bullet.ref.current.height / 2;
          const collisionDistance =
            asteroid.ref.current.collisionRadius +
            bullet.ref.current.collisionRadius;

          const distanceX = Math.abs(asteroidCenterX - bulletCenterX);
          const distanceY = Math.abs(asteroidCenterY - bulletCenterY);
          const distance = Math.sqrt(
            Math.pow(distanceX, 2) + Math.pow(distanceY, 2)
          );

          if (distance <= collisionDistance) {
            asteroid.ref.current.hp--;
            if (asteroid.ref.current.hp <= 0) {
              score += asteroid.ref.current.maxHp * 100;

              let newAsteroidsArray = this.state.asteroids;
              delete newAsteroidsArray[asteroidId];
              this.setState({ asteroids: newAsteroidsArray });
              this.asteroidsAmount--;

              if (this.asteroidsAmount <= 0) {
                const nextDay = new Date(this.state.date);
                nextDay.setDate(nextDay.getDate() + 1);

                const year = nextDay.getFullYear();
                let month = nextDay.getMonth() + 1;
                if (month < 10) month = "0" + month;
                let day = nextDay.getDate();
                if (day < 10) day = "0" + day;

                this.newGame(`${year}-${month}-${day}`);
              }
            }

            let newBulletArray = this.state.bullets;
            delete newBulletArray[bulletId]; //Delete is used to keep indexes intact. Indexes keep track of the keys of asteroid components
            this.setState({ bullets: newBulletArray });
          }
        }
      });
    });

    requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  newGame(
    date = "2023-03-01" //date format YYYY-MM-DD
  ) {
    game.setState({ date: date });
    game.setState({ asteroids: [] });
    game.asteroidsAmount = 0;

    ships = [];
    game.addShip();
    api(date).then((result) => {
      result.forEach((asteroid) => {
        game.addAsteroid(asteroid.name, asteroid.dia, asteroid.velocity);
      });
    });

    game.setState({ showMenu: false });
  }

  render() {
    return (
      <div className="game">
        <ShipFunc frame = {this.state.frame} addBullet = {this.addBullet}/>
        <Score score={score} />
        {this.state.date && <DateDisplay date={this.state.date} />}

        {this.state.asteroids.map((asteroid, asteroidId) => {
          if (asteroid)
            return (
              <Asteroid
                ref={asteroid.ref}
                key={asteroidId}
                {...asteroid.props}
              />
            );
        })}

        {ships.map((ship, shipId) => {
          return (
            <Ship ref={ship} key={shipId + 1000} addBullet={this.addBullet} />
          );
        })}

        {this.state.bullets.map((bullet, bulletId) => {
          return (
            <Bullet ref={bullet.ref} key={bulletId + 1100} {...bullet.props} />
          );
        })}

        {this.state.showMenu && <Menu newGame={this.newGame} />}
      </div>
    );
  }
}

export default Game;
