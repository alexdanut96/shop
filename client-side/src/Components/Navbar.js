import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="right">
        <h1>Dress-up.</h1>
      </div>
      <div className="center">
        <ul>
          <Link to="/">
            <li className="active">HOME</li>
          </Link>
          <li>ABOUT</li>
          <li>CONTACT US</li>
        </ul>
        <div className="search-box">
          <SearchIcon style={{ margin: "0 5px", color: "gray" }} />
          <input />
        </div>
      </div>
      <div className="left">
        <PersonIcon className="icon" />
        <Badge badgeContent={4} color="primary">
          <ShoppingCartIcon className="icon" color="action" />
        </Badge>
        <MenuIcon className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
