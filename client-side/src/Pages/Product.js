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

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/product/")[1];

  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState();

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
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
          if (response.status === 200) return response.json();
        })
        .then((product) => {
          return product;
        })
        .then((data) => {
          setProduct(data);
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
                      // onChange={handleFilters}
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
                <Box sx={{ width: 150 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select color
                    </InputLabel>
                    <Select
                      defaultValue=""
                      MenuProps={{ disableScrollLock: true }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="color"
                      // value={selectColor}
                      label="selectColor"
                      // onChange={handleFilters}
                    >
                      <MenuItem value="">
                        <em>Select color</em>
                      </MenuItem>
                      {product.color.map((color, index) => (
                        <MenuItem key={index} value={color}>
                          {color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="amount">
                <RemoveIcon onClick={decreaseAmount} className="amountIcon" />
                <span>{amount}</span>
                <AddIcon onClick={increaseAmount} className="amountIcon" />
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
