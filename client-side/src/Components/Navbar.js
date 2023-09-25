import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <nav className="navbar">
      <div className="right">
        <h1>Dress-upp.</h1>
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
        <Link to="/cart">
          <Badge badgeContent={quantity} color="primary">
            <ShoppingCartIcon className="icon" color="action" />
          </Badge>
        </Link>
        <MenuIcon className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
