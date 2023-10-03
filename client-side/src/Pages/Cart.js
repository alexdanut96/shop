import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.total);
  const savings = 0;
  const shipping = 10;
  const dispatch = useDispatch();

  const changeProductAmount = (e) => {
    const productId = e.target.dataset.productId;
    const productColor = e.target.dataset.productColor;
    const productSize = e.target.dataset.productSize;
    const amountAction = e.target.dataset.amountAction;
    dispatch(
      cartActions.modifyOrder({
        productId,
        productColor,
        productSize,
        amountAction,
      })
    );
  };

  const removeItem = (e) => {
    const productId = e.target.dataset.productId;
    const productColor = e.target.dataset.productColor;
    const productSize = e.target.dataset.productSize;
    dispatch(
      cartActions.removeFromCart({
        productId,
        productColor,
        productSize,
      })
    );
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>
          Cart{" "}
          <span style={{ fontWeight: "normal", color: "#7c7a79" }}>
            ({products.length} items)
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
            {products.length <= 0 && <div className="no-items">No items</div>}

            {cart.products.map((item, index) => (
              <div key={index} className="item-container">
                <div className="item">
                  <div className="item-left">
                    <img src={item.image} />
                    <div className="title">{item.title}</div>
                  </div>
                  <div className="item-right">
                    <div className="colors cart">
                      <div
                        style={{ backgroundColor: item.selectedColor }}
                        className="color"
                      ></div>
                      <div className="color-tag">{item.selectedColor}</div>
                    </div>

                    <div className="size">
                      <div>{item.selectedSize}</div>
                    </div>
                    <div className="quantity">
                      <div className="quantity-box">
                        <div
                          data-product-id={item._id}
                          data-product-color={item.selectedColor}
                          data-product-size={item.selectedSize}
                          data-amount-action="decrease"
                          onClick={changeProductAmount}
                          className="amountIcon"
                        >
                          -
                        </div>

                        <span>{item.amount}</span>
                        <div
                          data-product-id={item._id}
                          data-product-color={item.selectedColor}
                          data-product-size={item.selectedSize}
                          data-amount-action="increase"
                          onClick={changeProductAmount}
                          className="amountIcon"
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="price">${item.price * item.amount}</div>
                    <div className="icon">
                      <div
                        className="remove-btn"
                        data-product-id={item._id}
                        data-product-color={item.selectedColor}
                        data-product-size={item.selectedSize}
                        onClick={removeItem}
                      >
                        x
                      </div>
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
                <div className="amount">${totalPrice}</div>
              </div>
              <div className="savings-container">
                <h3>Savings</h3>
                <div className="amount">${savings}</div>
              </div>
              <hr />
              <div className="shipping-container">
                <h3>Shipping</h3>
                <div className="amount">${shipping}</div>
              </div>
              <hr />
              <div className="total-container">
                <h3>Total</h3>
                <div className="amount">${totalPrice + savings + shipping}</div>
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
