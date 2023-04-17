import '../css/Asteroid.css'; //Placeholder
import { useState } from 'react';



export default class Asteroid {
    

    

    constructor() {
        
        const [position, setPosition] = useState({x: 0, y: 0});


        setPosition({x: 5, y: 5});
        return (
          <div className="asteroid">
              *
          </div>
        );
      }


}