import { useEffect } from "react";
import styled from "styled-components";

const DateDiv = styled.div`
  position: fixed;
  top: 2vw;
  right: 2vw;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  z-index: 10;
  text-align: right;

  > * {
    margin: 0px;
  }
`;

const Date = (props) => {
  return (
    <DateDiv>
      <p>Date: {props.date}</p>
    </DateDiv>
  );
};

export default Date;
