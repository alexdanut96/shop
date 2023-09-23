import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="category-item-container">
      <Link to={`products/${item.cat}`}>
        <img src={item.img} />
        <div className="info">
          <h1>{item.title}</h1>
          <button>SHOP NOW</button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
