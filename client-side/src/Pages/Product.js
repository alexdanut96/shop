import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import img from "../images/sasaasaa.png";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Product = () => {
  const [selectSize, setSelectSize] = React.useState("");
  const [amount, setAmount] = React.useState(1);

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleChange = (event) => {
    setSelectSize(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="productPage-container">
        <div className="info">
          <img src={img} />
          <div className="product-info">
            <h1>Plain White Shirt</h1>
            <div className="price">$59.00</div>
            <div className="about-product">
              A classic t-shirt never goes out of style. This is our most
              premium collection of shirt. This plain white shirt is made up of
              pure cotton and has a premium finish.
            </div>
            <Box sx={{ width: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select size
                </InputLabel>
                <Select
                  MenuProps={{ disableScrollLock: true }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectSize}
                  label="SelectSize"
                  onChange={handleChange}
                >
                  <MenuItem value={"S"}>Small (S)</MenuItem>
                  <MenuItem value={"M"}>Medium (M)</MenuItem>
                  <MenuItem value={"L"}>Large (L)</MenuItem>
                  <MenuItem value={"XL"}>Extra Large (XL)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div className="amount">
              <RemoveIcon onClick={decreaseAmount} className="amountIcon" />
              <span>{amount}</span>
              <AddIcon onClick={increaseAmount} className="amountIcon" />
              <div className="button">ADD TO CART</div>
            </div>

            <div className="category">Category: Women, Polo, Casual</div>
            <div className="tags">Tags: Modern, Design, cotton</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
