import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  return (
    <div className="product-container">
      <img src={item.image} />
      <div className="info">
        <div className="title">{item.title}</div>
        <div className="price">${item.price}</div>
      </div>
      <div className="action-buttons">
        <Link to={`/product/${item._id}`}>
          <div className="icon">
            <VisibilityIcon />
          </div>
        </Link>
        <div className="icon">
          <FavoriteBorderIcon />
        </div>
        <div className="icon">
          <ShoppingCartOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Product;
