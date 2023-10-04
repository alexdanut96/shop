import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { checkoutPayment } from "../ApiRequests";

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

  // stripe functionality
  const navigate = useNavigate();
  const KEY = process.env.REACT_APP_STRIPE;
  const URL = checkoutPayment;
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(URL, {
          tokenId: stripeToken.id,
          amount: (totalPrice + savings + shipping) * 100,
        });
        navigate("/success", { state: { data: res.data } });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

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
                    <Link to={`/product/${item._id}`}>
                      <img src={item.image} />
                    </Link>
                    <Link to={`/product/${item._id}`} className="title">
                      {item.title}
                    </Link>
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
                <h3>Subtotal ({products.length} items)</h3>
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
                <StripeCheckout
                  name="e-comm"
                  image="https://cdn.dribbble.com/users/614270/screenshots/14575431/media/4907a0869e9ed2ac4e2d1c2beaf9f012.gif"
                  billingAddress
                  shippingAddress
                  description={`Total $${totalPrice + savings + shipping}`}
                  amount={(totalPrice + savings + shipping) * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <div className="checkout-button">Continue to Checkout</div>
                </StripeCheckout>
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
