import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import colors from "../utils/colors.json";

const NewProduct = () => {
  const [titleValidationError, setTitleValidationError] = useState(false);
  const [priceValidationError, setPriceValidationError] = useState(false);
  const [currencyValidationError, setCurrencyValidationError] = useState(false);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL"]);
  const [categories, setCategories] = useState([
    "woman",
    "man",
    "shirt",
    "trousers",
    "jacket",
    "hat",
  ]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showSizeChoices, setSizeShowChoices] = useState(false);
  const [showCategoriesChoices, setCategoriesShowChoices] = useState(false);
  const [categoryValidationError, setCategoryValidationError] = useState(false);
  const [colorValidationError, setColorValidationError] = useState(false);
  const [descriptionValidationError, setDescriptionValidationError] =
    useState(false);

  const handleChoices = (event) => {
    const type = event.currentTarget.dataset.type;
    event.preventDefault();
    if (type === "size") {
      setSizeShowChoices(!showSizeChoices);
    } else if (type === "category") {
      setCategoriesShowChoices(!showCategoriesChoices);
    }
  };

  const addSize = (event) => {
    const size = event.currentTarget.dataset.size;
    const newSizeArray = sizes.filter((item) => item !== size);
    setSizes(newSizeArray);
    setSelectedSizes([...selectedSizes, size]);
  };

  const removeSize = (event) => {
    const size = event.currentTarget.dataset.size;
    const newSizeArray = selectedSizes.filter((item) => item !== size);
    setSelectedSizes(newSizeArray);
    setSizes([...sizes, size]);
  };

  const addCategory = (event) => {
    const category = event.currentTarget.dataset.category;
    const newCategoriesArray = categories.filter((item) => item !== category);
    setCategories(newCategoriesArray);
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeCategory = (event) => {
    const category = event.currentTarget.dataset.category;
    const newCategoriesArray = selectedCategories.filter(
      (item) => item !== category
    );
    setSelectedCategories(newCategoriesArray);
    setCategories([...categories, category]);
  };

  const handleColor = (event) => {
    const color = event.currentTarget.value.split(" ")[0];
    setSelectedColor(color);
  };

  return (
    <div className="right-side-container">
      <div className="newProduct-container animated">
        <div className="newProductTitle">New Product</div>

        {/* Form */}
        <form>
          {/* Form Action */}
          <div className="form-action">
            <div className="profile-picture">
              <div className="img-container">
                <img
                  className="userUpdateImg"
                  // src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  src="https://firebasestorage.googleapis.com/v0/b/dress-up-shop-659bc.appspot.com/o/1699553486510_ce-se-intampla-cu-ionut-radu-dupa-ce-a-prins-doua-meciuri-in-premier-league-la-bournemouth_size7.jpg?alt=media&token=4ea97a3f-81ce-463d-880b-47e9df1189ea"
                  alt=""
                />
                <div
                  // onClick={editProfilePicture}
                  className="editIcon-container"
                >
                  <EditIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group field">
            {/* title */}
            <div className="wrapper">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className={`form-field title ${
                    titleValidationError ? "error" : ""
                  }`}
                  placeholder="Title"
                  name="title"
                  id="title"
                  required
                />
              </div>
              {titleValidationError ? (
                <div className="username error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* description */}
            <div className="wrapper">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className={`form-field title ${
                    descriptionValidationError ? "error" : ""
                  }`}
                  placeholder="Description"
                  name="description"
                  id="description"
                  required
                />
              </div>
              {descriptionValidationError ? (
                <div className="description error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* category */}
            <div className="wrapper">
              <label htmlFor="category" className="form-label">
                Category *
                {showCategoriesChoices ? (
                  <button
                    onClick={handleChoices}
                    data-type="category"
                    className="add-item"
                  >
                    Hide choices
                    <RemoveIcon />
                  </button>
                ) : (
                  <button
                    onClick={handleChoices}
                    data-type="category"
                    className="add-item"
                  >
                    Add category
                    <AddIcon />
                  </button>
                )}
              </label>
              {showCategoriesChoices ? (
                <div className="choices category">
                  {categories?.length > 0 ? (
                    categories.map((category) => (
                      <div
                        onClick={addCategory}
                        key={category}
                        data-category={category}
                        className="choice"
                      >
                        {category}
                      </div>
                    ))
                  ) : (
                    <div className="empty-spot">Empty</div>
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="input-wrapper">
                <div className="chosen-items category">
                  {selectedCategories?.length > 0 ? (
                    selectedCategories.map((category) => (
                      <div
                        key={category}
                        data-category={category}
                        className="choice"
                      >
                        {category}
                        <CloseIcon
                          data-category={category}
                          onClick={removeCategory}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="empty-spot">Empty</div>
                  )}
                </div>
              </div>
            </div>

            {/* size */}
            <div className="wrapper">
              <label htmlFor="category" className="form-label">
                Size *
                {showSizeChoices ? (
                  <button
                    onClick={handleChoices}
                    data-type="size"
                    className="add-item"
                  >
                    Hide choices
                    <RemoveIcon />
                  </button>
                ) : (
                  <button
                    onClick={handleChoices}
                    data-type="size"
                    className="add-item"
                  >
                    Add size
                    <AddIcon />
                  </button>
                )}
              </label>
              {showSizeChoices ? (
                <div className="choices size">
                  {sizes?.length > 0 ? (
                    sizes.map((size) => (
                      <div
                        onClick={addSize}
                        key={size}
                        data-size={size}
                        className="choice"
                      >
                        {size}
                      </div>
                    ))
                  ) : (
                    <div className="empty-spot">Empty</div>
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="input-wrapper">
                <div className="chosen-items size">
                  {selectedSizes?.length > 0 ? (
                    selectedSizes.map((size) => (
                      <div key={size} data-size={size} className="choice">
                        {size}
                        <CloseIcon data-size={size} onClick={removeSize} />
                      </div>
                    ))
                  ) : (
                    <div className="empty-spot">Empty</div>
                  )}
                </div>
              </div>
            </div>

            {/* color */}
            <div className="wrapper">
              <label htmlFor="color" className="form-label">
                Color *
                {selectedColor ? (
                  <div
                    style={{ background: selectedColor }}
                    className="color-print"
                  ></div>
                ) : (
                  ""
                )}
              </label>
              <div className="input-wrapper">
                <select defaultValue="Select color" onChange={handleColor}>
                  <option disabled>Select color</option>
                  {colors.map((color) => (
                    <option
                      value={`${color.hex} ${color.name}`}
                      data-hex={color.hex}
                      style={{ color: `${color.hex}` }}
                      key={color.name}
                    >
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
              {colorValidationError ? (
                <div className="color error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* price */}
            <div className="wrapper">
              <label htmlFor="price" className="form-label">
                Price *
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  className={`form-field price ${
                    priceValidationError ? "error" : ""
                  }`}
                  placeholder="Price"
                  name="price"
                  id="price"
                  required
                />
              </div>
              {priceValidationError ? (
                <div className="price error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* currency */}
            <div className="wrapper">
              <label htmlFor="currency" className="form-label">
                Currency *
              </label>
              <div className="input-wrapper">
                <select>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
              {currencyValidationError ? (
                <div className="currency error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <button
            //  onClick={addNewUser}
            className="save-changes"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewProduct;
