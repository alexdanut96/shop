import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const [selectSize, setSelectSize] = React.useState("S");
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
      <div className="cart-container">
        <h1>
          Cart{" "}
          <span style={{ fontWeight: "normal", color: "#7c7a79" }}>
            (3 items)
          </span>
        </h1>
        <div className="order-container">
          <div className="left">
            <div className="properties">
              <div className="property">Color</div>
              <div className="property">Size</div>
              <div className="property">Quantity</div>
              <div className="property">Price</div>
            </div>
            <hr />
            <div className="item">
              <div className="item-left">
                <img src={img1} />
                <div className="title">Plain White Shirt</div>
              </div>
              <div className="item-right">
                <div className="colors">
                  <div className="color"></div>
                  <div className="color"></div>
                  <div className="color"></div>
                </div>
                <div className="size">
                  <FormControl sx={{ m: 0, minWidth: 100 }}>
                    <Select
                      style={{ height: "36px" }}
                      MenuProps={{ disableScrollLock: true }}
                      value={selectSize}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"S"}>S</MenuItem>
                      <MenuItem value={"M"}>M</MenuItem>
                      <MenuItem value={"L"}>L</MenuItem>
                      <MenuItem value={"XL"}>XL</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="quantity">
                  <div className="quantity-box">
                    <RemoveIcon
                      onClick={decreaseAmount}
                      className="amountIcon"
                    />
                    <span>{amount}</span>
                    <AddIcon onClick={increaseAmount} className="amountIcon" />
                  </div>
                </div>

                <div className="price">$29.00</div>
                <div className="icon">
                  <CloseIcon style={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="item-left">
                <img src={img2} />
                <div className="title">Denim Jacket</div>
              </div>
              <div className="item-right">
                <div className="colors">
                  <div className="color"></div>
                  <div className="color"></div>
                  <div className="color"></div>
                </div>
                <div className="size">
                  <FormControl sx={{ m: 0, minWidth: 100 }}>
                    <Select
                      style={{ height: "36px" }}
                      MenuProps={{ disableScrollLock: true }}
                      value={selectSize}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"S"}>S</MenuItem>
                      <MenuItem value={"M"}>M</MenuItem>
                      <MenuItem value={"L"}>L</MenuItem>
                      <MenuItem value={"XL"}>XL</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="quantity">
                  <div className="quantity-box">
                    <RemoveIcon
                      onClick={decreaseAmount}
                      className="amountIcon"
                    />
                    <span>{amount}</span>
                    <AddIcon onClick={increaseAmount} className="amountIcon" />
                  </div>
                </div>
                <div className="price">$69.00</div>
                <div className="icon">
                  <CloseIcon />
                </div>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="item-left">
                <img src={img3} />
                <div className="title">Black Polo Shirt</div>
              </div>
              <div className="item-right">
                <div className="colors">
                  <div className="color"></div>
                  <div className="color"></div>
                  <div className="color"></div>
                </div>
                <div className="size">
                  <FormControl sx={{ m: 0, minWidth: 100 }}>
                    <Select
                      style={{ height: "36px" }}
                      MenuProps={{ disableScrollLock: true }}
                      value={selectSize}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"S"}>S</MenuItem>
                      <MenuItem value={"M"}>M</MenuItem>
                      <MenuItem value={"L"}>L</MenuItem>
                      <MenuItem value={"XL"}>XL</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="quantity">
                  <div className="quantity-box">
                    <RemoveIcon
                      onClick={decreaseAmount}
                      className="amountIcon"
                    />
                    <span>{amount}</span>
                    <AddIcon onClick={increaseAmount} className="amountIcon" />
                  </div>
                </div>
                <div className="price">$49.00</div>
                <div className="icon">
                  <CloseIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="checkout-box">
              <div className="subtotal-container">
                <h3>Subtotal (3 items)</h3>
                <div className="amount">$540</div>
              </div>
              <div className="savings-container">
                <h3>Savings</h3>
                <div className="amount">-$30%</div>
              </div>
              <hr />
              <div className="shipping-container">
                <h3>Shipping</h3>
                <div className="amount">$0</div>
              </div>
              <hr />
              <div className="total-container">
                <h3>Total</h3>
                <div className="amount">$510</div>
              </div>
              <div className="checkout-button-container">
                <div className="checkout-button">Continue to Checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
