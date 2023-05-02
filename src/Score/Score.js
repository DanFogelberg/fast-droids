import styled from "styled-components";

const Score = (props) => 
{
    const ScoreDiv = styled.div`
    position: fixed;
    top: 3vw;
    left: 3vw;
    color: white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    z-index: 10;
    `;

    // const ScoreP = styled.p`
    // color: red;
    // `

    return <ScoreDiv>
        <p>Score: {props.score}</p>

    </ScoreDiv>


}

export default Score;