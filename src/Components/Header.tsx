import styled from "styled-components";

const Nav = styled.div``;
const Col = styled.div``;
const Logo = styled.svg``;
const Items = styled.ul``;
const Item = styled.li``;
const Search = styled.span``;

function Header() {
  return (
    <Nav>
      <Col>
        <Logo></Logo>
        <Items>
          <Item>Home</Item>
          <Item>Tv Shows</Item>
        </Items>
      </Col>
      <Col>
        <Search></Search>
      </Col>
    </Nav>
  );
}

export default Header;
