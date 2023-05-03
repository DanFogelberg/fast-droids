import styled from 'styled-components';


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
