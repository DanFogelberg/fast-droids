import styled from 'styled-components';

const MenuDiv = styled.div`
  font-size: 32px; 
  position: absolute;
  color: white;
  z-index: 1;
  top: 0;   
  width: 100vw;
  display: flex;
  justify-content: center;
  text-shadow: -1px 0 orange, 0 1px orange, 1px 0 orange, 0 -1px orange;
  
  
  > *{
    transition-duration: 3s, 5s;
  }
 

  > *:hover{
    color: red;
    text-align: center;
    vertical-align: center;
    
    
  }
  `





function Menu() {

  

  return (
    <MenuDiv className="menu">
      <h1>Kostbollar</h1>
    </MenuDiv>
  );
}

export default Menu;
