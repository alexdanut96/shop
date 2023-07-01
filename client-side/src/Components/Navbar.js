import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  height: 60px;
`;

const Right = styled.div`
  flex: 1;
`;

const Center = styled.div`
  display: flex;
  flex: 3;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  gap: 20px;

  .icon {
    font-size: 2rem;
    color: black;
    cursor: pointer;
  }
`;

const Logo = styled.h1`
  cursor: pointer;
  width: fit-content;
`;

const Navlinks = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  gap: 8px;

  .active {
    color: #024e82;
    border: solid 1px #dcdcdc;
  }
`;

const SearchBox = styled.div`
  border: solid 1px #dcdcdc;
  height: 30px;
  width: max(100px, 30vw);
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
`;

const Link = styled.li`
  padding: 5px 15px;
  font-weight: 600;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <Container>
      <Right>
        <Logo>Dress-up.</Logo>
      </Right>
      <Center>
        <Navlinks>
          <Link className="active">HOME</Link>
          <Link>ABOUT</Link>
          <Link>CONTACT US</Link>
        </Navlinks>
        <SearchBox>
          <SearchIcon style={{ margin: "0 5px", color: "gray" }} />
          <Input />
        </SearchBox>
      </Center>
      <Left>
        <PersonIcon className="icon" />
        <Badge badgeContent={4} color="primary">
          <ShoppingCartIcon className="icon" color="action" />
        </Badge>
        <MenuIcon className="icon" />
      </Left>
    </Container>
  );
};

export default Navbar;
