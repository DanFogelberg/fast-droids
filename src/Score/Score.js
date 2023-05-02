import { useEffect } from "react";
import styled from "styled-components";

const ScoreDiv = styled.div`
position: fixed;
top: 2vw;
left: 2vw;
color: white;
text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
z-index: 10;

> *{
    margin: 0px;

}

`;


const Score = (props) => 
{



    // const ScoreP = styled.p`
    // color: red;
    // `

    return <ScoreDiv>
        <p>Score: {props.score}</p>

    </ScoreDiv>


}

export default Score;