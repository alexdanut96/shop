import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useLocation } from "react-router-dom";
import { productApi, token } from "../ApiRequests";
import Swal from "sweetalert2";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/product/")[1];

  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();

  const handleAmount = (type) => {
    if (type === "increase") {
      setAmount((prevState) => prevState + 1);
    } else {
      amount > 1 && setAmount((prevState) => prevState - 1);
    }
  };

  const selectSize = (e) => {
    setSize(e.target.value);
  };
  const selectColor = (e) => {
    const selectedColor = e.target.dataset.colorType;
    setColor(selectedColor);
  };

  useEffect(() => {
    const getProduct = () => {
      fetch(`${productApi}${id}`, {
        method: "GET",
        headers: {
          token: token,
        },
      })
        .then((response) => {
          switch (response.status) {
            case 200:
              return response.json();

            case 401:
            case 403:
              return response.json().then((error) => {
                throw new Error(error.message);
              });

            default:
              throw new Error(`Please contact the development departament!`);
          }
        })
        .then((product) => {
          return product;
        })
        .then((data) => {
          setProduct(data);
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
  }, [id]);

  return (
    <>
      <Navbar />
      {product ? (
        <div className="productPage-container">
          <div className="info">
            <img src={product.image} />
            <div className="product-info">
              <h1>{product.title}</h1>
              <div className="price">{product.price} $</div>
              <div className="about-product">{product.description}</div>
              <div className="filters">
                <Box sx={{ width: 150 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select size
                    </InputLabel>
                    <Select
                      defaultValue=""
                      MenuProps={{ disableScrollLock: true }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="size"
                      onChange={selectSize}
                      // value={selectGender}
                      label="selectSize"
                    >
                      <MenuItem value="">
                        <em>Select size</em>
                      </MenuItem>
                      {product.size.map((size, index) => (
                        <MenuItem key={index} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <div className="colors">
                  Colors:
                  {product.color.map((color) => (
                    <div
                      key={color}
                      className="color"
                      data-color-type={color}
                      style={{ backgroundColor: color }}
                      onClick={selectColor}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="amount">
                <RemoveIcon
                  onClick={() => handleAmount("decrease")}
                  className="amountIcon"
                />
                <span>{amount}</span>
                <AddIcon
                  onClick={() => handleAmount("increase")}
                  className="amountIcon"
                />
                <div className="button">ADD TO CART</div>
              </div>

              <div className="category">
                Categories:
                {product.categories.map((category, index) => (
                  <div key={index}>{category}</div>
                ))}
              </div>
              <div className="tags">Tags: Modern, Design, cotton</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Product;
