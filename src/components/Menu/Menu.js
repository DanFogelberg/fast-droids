import { useRef, useState, useEffect } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import styled from "styled-components";

/* 
To do: 
- Description - real asteroids - if you pause the asteroids win and earth has lost all hope
- Controls
- Date picker: prop from game to menu
*/

const MenuDiv = styled.div`
  font-size: 32px;
  position: absolute;
  color: white;
  z-index: 1;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-shadow: -1px 0 orange, 0 1px orange, 1px 0 orange, 0 -1px orange;

  > * {
    transition-duration: 3s, 5s;
    text-align: center;
    vertical-align: center;
  }

  > h2:hover {
    color: red;
  }
`;

const DatePicker = (props) => {
  return (
    <div>
      <input
        type="date"
        onChange={props.handleChange}
        value={props.date}

        // ref={dateInputRef}
      />
      <p>{props.date}</p>
    </div>
  );
};

function Menu(props) {
  const [date, setDate] = useState("2000-01-01");
  // const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <MenuDiv className="menu">
      <h1>SpaceBalls</h1>
      <h2
        onClick={() => {
          props.newGame(date);
        }}
      >
        New Game
      </h2>
      <DatePicker handleChange={handleChange} date={date}></DatePicker>
    </MenuDiv>
  );
}

export default Menu;
