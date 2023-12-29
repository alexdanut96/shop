import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import colors from "../utils/colors.json";
import uploadImage from "../images/upload_img.png";
import Swal from "sweetalert2";
import appUsers from "../Firebase";
import { useSelector } from "react-redux";
import { ValidateEmptyValue } from "../utils/formValidation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { BASE_URL } from "../ApiRequests";

const NewProduct = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);

  const [imageValidationError, setImageValidationError] = useState(false);
  const [titleValidationError, setTitleValidationError] = useState(false);
  const [descriptionValidationError, setDescriptionValidationError] =
    useState(false);
  const [categoryValidationError, setCategoryValidationError] = useState(false);
  const [sizeValidationError, setSizeValidationError] = useState(false);
  const [colorValidationError, setColorValidationError] = useState(false);
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

  const addNewProduct = async (event) => {
    event.preventDefault();
    const image = document.querySelector("#img-view");
    const title = document.querySelector("input#title");
    const description = document.querySelector("input#description");
    const category = document.querySelector(".chosen-items.category");
    const size = document.querySelector(".chosen-items.size");
    const color = document.querySelector("select.color");
    const price = document.querySelector("input#price");
    const currency = document.querySelector("select.currency");

    if (
      !validForm(
        image.dataset.ok,
        title.value,
        description.value,
        category.childNodes,
        size.childNodes,
        color.value,
        price.value,
        currency.value
      )
    ) {
      return;
    }

    saveToMongoDB();
  };

  const validForm = (
    image,
    title,
    description,
    category,
    size,
    color,
    price,
    currency
  ) => {
    let isImage;
    let isTitle;
    let isDescription;
    let isCategory;
    let isSize;
    let isColor;
    let isPrice;
    let isCurrency;

    if (image === "false") {
      setImageValidationError(true);
      isImage = true;
    } else {
      setImageValidationError(false);
      isImage = false;
    }

    if (!ValidateEmptyValue(title)) {
      setTitleValidationError(true);
      isTitle = true;
    } else {
      setTitleValidationError(false);
      isTitle = false;
    }

    if (!ValidateEmptyValue(description)) {
      setDescriptionValidationError(true);
      isDescription = true;
    } else {
      setDescriptionValidationError(false);
      isDescription = false;
    }

    if (category.length > 0) {
      if (category[0].classList.contains("empty-spot")) {
        setCategoryValidationError(true);
        isCategory = true;
      } else {
        setCategoryValidationError(false);
        isCategory = false;
      }
    } else {
      setCategoryValidationError(false);
      isCategory = false;
    }

    if (size.length > 0) {
      if (size[0].classList.contains("empty-spot")) {
        setSizeValidationError(true);
        isSize = true;
      } else {
        setSizeValidationError(false);
        isSize = false;
      }
    } else {
      setSizeValidationError(false);
      isSize = false;
    }

    if (!ValidateEmptyValue(color)) {
      setColorValidationError(true);
      isColor = true;
    } else {
      setColorValidationError(false);
      isColor = false;
    }

    if (!ValidateEmptyValue(price)) {
      setPriceValidationError(true);
      isPrice = true;
    } else {
      setPriceValidationError(false);
      isPrice = false;
    }

    if (!ValidateEmptyValue(currency)) {
      setCurrencyValidationError(true);
      isCurrency = true;
    } else {
      setCurrencyValidationError(false);
      isCurrency = false;
    }

    if (
      isImage ||
      isTitle ||
      isDescription ||
      isCategory ||
      isSize ||
      isColor ||
      isPrice ||
      isCurrency
    ) {
      return false;
    } else {
      return true;
    }
  };

  const uploadProductImage = () => {
    const imageView = document.querySelector("#img-view");
    const cloudImg = document.querySelector("#img-view img");
    const paragraph = document.querySelector("#img-view p");
    const inputFile = document.querySelector("#input-file");
    const dropArea = document.querySelector("#drop-area svg");
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.dataset.ok = true;
    cloudImg.style.display = "none";
    paragraph.style.display = "none";
    dropArea.style.display = "block";
    setImageValidationError(false);
  };

  const boxDragOver = (event) => {
    const dropArea = document.querySelector("#drop-area");
    event.preventDefault();
    if (event.target.id === "upload-container") {
      dropArea.style.backgroundColor = "#f1f1f9";
      dropArea.style.borderColor = "#aeadad";
    } else {
      dropArea.style.backgroundColor = "#ebebfb";
      dropArea.style.borderColor = "#7e7eff";
    }
  };

  const dropAreaDragOver = (event) => {
    event.preventDefault();
  };

  const dropAreaDrop = (event) => {
    const dropArea = document.querySelector("#drop-area");
    const inputFile = document.querySelector("#input-file");
    event.preventDefault();
    inputFile.files = event.dataTransfer.files;
    uploadProductImage();
    dropArea.style.backgroundColor = "#f1f1f9";
    dropArea.style.borderColor = "#aeadad";
  };

  const removeProductPicture = (event) => {
    event.preventDefault();
    const dropArea = document.querySelector("#drop-area svg");
    const image = document.querySelector("#img-view");
    const cloudImg = document.querySelector("#img-view img");
    const paragraph = document.querySelector("#img-view p");
    dropArea.style.display = "none";
    image.dataset.ok = false;
    image.style.backgroundImage = "none";
    cloudImg.style.display = "flex";
    paragraph.style.display = "flex";
  };

  const saveToMongoDB = async () => {
    const inputFile = document.querySelector("#input-file");
    const file = inputFile.files[0];
    const fileName = new Date().getTime() + "_" + file.name;
    const storage = getStorage(appUsers);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // uploadLoading.innerHTML = `${parseInt(progress)}%`;
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);

          const titleElement = document.querySelector("input#title");
          const descriptionElemet = document.querySelector("input#description");
          const categoriesElement =
            document.querySelectorAll(".choice.category");
          const sizesElement = document.querySelectorAll(".choice.size");
          const colorElement = document.querySelector("select.color");
          const priceElement = document.querySelector("input#price");
          const currencyElement = document.querySelector("select.currency");

          const titleValue = titleElement.value;
          const descriptionValue = descriptionElemet.value;
          const imageUrl = downloadURL;
          const colorName = colorElement.value.split(" ")[1];
          const colorHex = colorElement.value.split(" ")[0];
          let categoriesArray = [];
          let sizesArray = [];
          let colorsArray = [{ name: colorName, hex: colorHex }];
          const priceValue = priceElement.value;
          const currencyValue = currencyElement.value;

          Array.from(categoriesElement).forEach((category) =>
            categoriesArray.push(category.dataset.category)
          );

          Array.from(sizesElement).forEach((size) =>
            sizesArray.push(size.dataset.size)
          );

          const data = {
            title: titleValue,
            description: descriptionValue,
            image: imageUrl,
            categories: categoriesArray,
            size: sizesArray,
            color: colorsArray,
            price: priceValue,
            currency: currencyValue,
          };

          fetch(`${BASE_URL}products/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              switch (response.status) {
                case 201:
                  Swal.fire({
                    icon: "success",
                    title: "New product added to Database!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  clearForm();
                  return;
                case 400:
                case 401:
                case 403:
                  return response.json().then((error) => {
                    throw new Error(error.message);
                  });

                default:
                  throw new Error(
                    `Please contact the development departament!`
                  );
              }
            })
            .catch((error) => {
              console.error(error.message);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something went wrong! ${error.message}`,
                footer: '<a href="/">Go back to home page</a>',
              });
            });
        });
      }
    );
  };

  const clearForm = () => {
    const titleElement = document.querySelector("input#title");
    const descriptionElemet = document.querySelector("input#description");
    const colorElement = document.querySelector("select.color");
    const priceElement = document.querySelector("input#price");
    const currencyElement = document.querySelector("select.currency");

    titleElement.value = "";
    descriptionElemet.value = "";
    colorElement.value = "";
    priceElement.value = "";
    currencyElement.value = "";

    setSelectedColor(false);
    setCategories(["woman", "man", "shirt", "trousers", "jacket", "hat"]);
    setSizes(["XS", "S", "M", "L", "XL"]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setCategoriesShowChoices(false);
    setSizeShowChoices(false);

    const dropArea = document.querySelector("#drop-area svg");
    const imageview = document.querySelector("#img-view");
    const cloudImg = document.querySelector("#img-view img");
    const paragraph = document.querySelector("#img-view p");
    dropArea.style.display = "none";
    imageview.dataset.ok = false;
    imageview.style.backgroundImage = "none";
    cloudImg.style.display = "flex";
    paragraph.style.display = "flex";
  };

  return (
    <div className="right-side-container">
      <div className="newProduct-container animated">
        <div className="newProductTitle">New Product</div>

        {/* Form */}
        <form>
          {/* Product Image */}
          <div className="swal2-html-container">
            <div onDragOver={boxDragOver} id="upload-container">
              <label
                onDrop={dropAreaDrop}
                onDragOver={dropAreaDragOver}
                htmlFor="input-file"
                className={imageValidationError ? "error" : ""}
                id="drop-area"
              >
                <CloseIcon onClick={removeProductPicture} />
                <input
                  onChange={uploadProductImage}
                  type="file"
                  id="input-file"
                  accept="image/*"
                  hidden
                />
                <div id="img-view" data-ok="false">
                  <img id="uploadImg" src={uploadImage} alt="avatar" />
                  <p>
                    Drag and drop or click here
                    <br />
                    to upload product image
                  </p>
                </div>
              </label>
            </div>
          </div>
          {imageValidationError ? (
            <div className="image error-message">
              Product image is required!
            </div>
          ) : (
            <></>
          )}

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
                <div className="title error-message">
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
                <div
                  className={
                    categoryValidationError
                      ? "chosen-items category error"
                      : "chosen-items category"
                  }
                >
                  {selectedCategories?.length > 0 ? (
                    selectedCategories.map((category) => (
                      <div
                        key={category}
                        data-category={category}
                        className="choice category"
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
              {categoryValidationError ? (
                <div className="title error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
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
                <div
                  className={
                    sizeValidationError
                      ? "chosen-items size error"
                      : "chosen-items size"
                  }
                >
                  {selectedSizes?.length > 0 ? (
                    selectedSizes.map((size) => (
                      <div key={size} data-size={size} className="choice size">
                        {size}
                        <CloseIcon data-size={size} onClick={removeSize} />
                      </div>
                    ))
                  ) : (
                    <div className="empty-spot">Empty</div>
                  )}
                </div>
              </div>
              {sizeValidationError ? (
                <div className="title error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
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
                <select
                  className={colorValidationError ? "color error" : "color"}
                  defaultValue=""
                  onChange={handleColor}
                >
                  <option value="" disabled>
                    Select color
                  </option>
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
                <select
                  defaultValue=""
                  className={
                    currencyValidationError ? "currency error" : "currency"
                  }
                >
                  <option disabled value="">
                    Choose currency
                  </option>
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
          <button onClick={addNewProduct} className="save-changes">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewProduct;
