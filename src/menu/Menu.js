import styled from 'styled-components';

const MenuDiv = styled.div`
  font-size: 32px; 
  position: absolute;
    color: white;
    z-index: 1;
    top: 0;   


    &: hover{
      color:red;
    }
  `





function Menu() {

  

  return (
    <MenuDiv className="menu">
      Kostbollar
    </MenuDiv>
  );
}

export default Menu;
