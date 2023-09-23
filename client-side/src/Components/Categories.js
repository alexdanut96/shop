import { categories } from "../data/Items.js";
import CategoryItem from "./CategoryItem.js";

const Categories = () => {
  return (
    <div className="categories-container">
      <h1>Choose your category</h1>
      <div className="category">
        {categories
          ? categories.map((item) => <CategoryItem item={item} key={item.id} />)
          : ""}
      </div>
    </div>
  );
};

export default Categories;
