import { useEffect, useState } from "react";
import { BASE_URL } from "../../ApiRequests";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import uploadImage from "../../images/upload_img.png";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import colors from "../../utils/colors.json";
import appUsers from "../../Firebase";
import { ValidateEmptyValue } from "../../utils/formValidation";
import productSizes from "../../utils/productSizes.json";
import productCategories from "../../utils/productCategories.json";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ProductDetails = () => {
  const [imageValidationError, setImageValidationError] = useState(false);
  const [titleValidationError, setTitleValidationError] = useState(false);
  const [descriptionValidationError, setDescriptionValidationError] =
    useState(false);
  const [categoryValidationError, setCategoryValidationError] = useState(false);
  const [sizeValidationError, setSizeValidationError] = useState(false);
  const [colorValidationError, setColorValidationError] = useState(false);
  const [priceValidationError, setPriceValidationError] = useState(false);
  const [currencyValidationError, setCurrencyValidationError] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageChanged, setImageChanged] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showSizeChoices, setSizeShowChoices] = useState(false);
  const [showCategoriesChoices, setCategoriesShowChoices] = useState(false);

  const token = useSelector((state) => state.user.currentUser.accessToken);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [product, setProduct] = useState();
  const [productSuccess, setProductSuccess] = useState(0);

  const availableItems = (a, b) => {
    return a.filter((element) => {
      return !b.includes(element);
    });
  };

  useEffect(() => {
    const getProduct = () => {
      fetch(`${BASE_URL}products/find/${id}`, {
        method: "GET",
        headers: { token: `Bearer ${token}` },
      })
        .then((response) => {
          switch (response.status) {
            case 200:
              return response.json();

            case 400:
            case 401:
            case 403:
            case 410:
              return response.json().then((error) => {
                throw new Error(error.message);
              });
            case 404:
              throw new Error("404 Page not found!");

            default:
              return response.json().then((error) => {
                if (error && error.message) {
                  throw new Error(error.message);
                } else {
                  throw new Error(
                    `Please contact the development departament!`
                  );
                }
              });
          }
        })
        .then((user) => {
          return user;
        })
        .then(async (data) => {
          await fetch(data.image)
            .then((response) => {
              if (response.status === 404) {
                data.image = "";
              } else {
              }
            })
            .catch((error) => {
              console.log(error);
            });

          setProduct(data);
          setSelectedSizes(data.size);
          setSelectedCategories(data.categories);
          setCategories(availableItems(productCategories, data.categories));
          setSizes(availableItems(productSizes, data.size));
          setSelectedColor(data.color[0]);
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
    };

    getProduct();
  }, [productSuccess]);
  console.log(product);

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

  // handle product picture functions

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
    setImageChanged(true);
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

  // handle product picture functions

  // handle color

  const handleColor = (event) => {
    const colorName = event.currentTarget.value;
    const colorHex = colors.find((color) => color.name === colorName).hex;
    setSelectedColor({ name: colorName, hex: colorHex });
  };

  // handle color

  // form validation

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

  // form validation

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

    if (imageChanged) {
      getImageUrlAndSavaChanges();
    } else {
      const imageUrl = getSubstring(
        document.querySelector("#img-view").style.backgroundImage,
        '"',
        '"'
      );
      saveChanges(imageUrl);
    }
  };

  const getImageUrlAndSavaChanges = () => {
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
          saveChanges(downloadURL);
        });
      }
    );
  };

  const getSubstring = (string, char1, char2) => {
    return string.slice(string.indexOf(char1) + 1, string.lastIndexOf(char2));
  };

  const saveChanges = (imgUrl) => {
    const titleElement = document.querySelector("input#title");
    const descriptionElemet = document.querySelector("input#description");
    const categoriesElement = document.querySelectorAll(".choice.category");
    const sizesElement = document.querySelectorAll(".choice.size");
    const colorElement = document.querySelector("select.color");
    const priceElement = document.querySelector("input#price");
    const currencyElement = document.querySelector("select.currency");

    const titleValue = titleElement.value;
    const descriptionValue = descriptionElemet.value;
    const imageUrl = imgUrl;
    const colorName = colorElement.value;
    const colorHex = colors.find(
      (color) => color.name === colorElement.value
    ).hex;

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

    fetch(`${BASE_URL}products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            Swal.fire({
              icon: "success",
              title: "Product updated!",
              showConfirmButton: false,
              timer: 1500,
            });
            setProductSuccess(productSuccess + 1);
            return;
          case 400:
          case 401:
          case 403:
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          default:
            throw new Error(`Please contact the development departament!`);
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
  };

  return (
    <>
      <div className="back-link-container">
        <Link to="/products">
          <div className="back-link">
            <ArrowBackIcon />
            Products
          </div>
        </Link>
        <Link to="/newproduct">
          <Tooltip title="Add new product" placement="left" arrow>
            <AddCircleIcon className="newProduct" />
          </Tooltip>
        </Link>
      </div>

      {product ? (
        <div className="productUpdate animated">
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
                  <CloseIcon
                    style={{ display: product.image ? "flex" : "none" }}
                    className="edit-product"
                    onClick={removeProductPicture}
                  />

                  <input
                    onChange={uploadProductImage}
                    type="file"
                    id="input-file"
                    accept="image/*"
                    hidden
                  />
                  <div
                    id="img-view"
                    style={{
                      backgroundImage: product.image
                        ? `url(${product.image})`
                        : "none",
                    }}
                    data-ok={product.image ? "true" : "false"}
                  >
                    <img
                      style={{ display: product.image ? "none" : "flex" }}
                      id="uploadImg"
                      src={uploadImage}
                      alt="avatar"
                    />
                    <p
                      style={{
                        display: product.image ? "none" : "flex",
                        textAlign: "center",
                      }}
                    >
                      {product.image
                        ? "Drag and drop or click here to upload product image"
                        : "Image has been deleted from Firebase! Drag and drop or click here to upload product image"}
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
                    defaultValue={product.title}
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
                    defaultValue={product.description}
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
                        <div
                          key={size}
                          data-size={size}
                          className="choice size"
                        >
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
                  {product.color[0].hex ? (
                    <div
                      style={{ background: selectedColor.hex }}
                      className="color-print"
                    ></div>
                  ) : (
                    ""
                  )}
                </label>
                <div className="input-wrapper">
                  <select
                    className={colorValidationError ? "color error" : "color"}
                    defaultValue={product.color[0].name}
                    onChange={handleColor}
                  >
                    <option value="" disabled>
                      Select color
                    </option>
                    {colors.map((color) => (
                      <option
                        defaultValue={`${color.hex} ${color.name}`}
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
                    defaultValue={product.price}
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
                    defaultValue={product.currency}
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
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
