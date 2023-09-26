import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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

  const changeProductDetails = (e) => {
    const elementType = e.target.dataset.elementType;
    const productId = e.target.dataset.productId;
    if (elementType === "color") {
      const selectedColor = e.target.dataset.colorType;
      dispatch(
        cartActions.modifyOrder({
          property: elementType,
          productId,
          selectedColor,
        })
      );
    } else if (elementType === "amount") {
      const amountAction = e.target.dataset.amountAction;
      dispatch(
        cartActions.modifyOrder({
          property: elementType,
          productId,
          amountAction,
        })
      );
    }
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
            {cart.products.map((item) => (
              <div key={item._id} className="item-container">
                <div className="item">
                  <div className="item-left">
                    <img src={item.image} />
                    <div className="title">{item.title}</div>
                  </div>
                  <div className="item-right">
                    <div className="colors cart">
                      {item.color.map((color) => (
                        <div
                          key={color}
                          className={`color ${
                            item.selectedColor === color && "active"
                          }`}
                          data-color-type={color}
                          data-product-id={item._id}
                          data-element-type="color"
                          style={{ backgroundColor: color }}
                          onClick={changeProductDetails}
                        ></div>
                      ))}
                      <div className="color-tag">{item.selectedColor}</div>
                    </div>

                    <div className="size">
                      <FormControl sx={{ m: 0, minWidth: 100 }}>
                        <Select
                          style={{ height: "36px" }}
                          MenuProps={{ disableScrollLock: true }}
                          // value={item.selectedSize}
                          defaultValue={item.selectedSize}
                          onChange={handleChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="">
                            <em>Select size</em>
                          </MenuItem>
                          {item.size.map((size) => {
                            if (item.selectedSize === size) {
                              return (
                                <MenuItem defaultValue key={size} value={size}>
                                  {size}
                                </MenuItem>
                              );
                            } else {
                              return (
                                <MenuItem key={size} value={size}>
                                  {size}
                                </MenuItem>
                              );
                            }
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="quantity">
                      <div className="quantity-box">
                        <div
                          data-product-id={item._id}
                          data-element-type="amount"
                          data-amount-action="decrease"
                          onClick={changeProductDetails}
                          className="amountIcon"
                        >
                          -
                        </div>

                        <span>{item.amount}</span>
                        <div
                          data-product-id={item._id}
                          data-element-type="amount"
                          data-amount-action="increase"
                          onClick={changeProductDetails}
                          className="amountIcon"
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="price">${item.price * item.amount}</div>
                    <div className="icon">
                      <CloseIcon />
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
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
