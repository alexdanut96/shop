const BASE_URL = "http://localhost:5000/api/";

// products
const allProductsApi = "http://localhost:5000/api/products";
const productApi = "http://localhost:5000/api/products/find/";
const categoryProductsApi = "http://localhost:5000/api/products?category=";

//token
const token = process.env.REACT_APP_TOKEN;

//payment
const checkoutPayment = "http://localhost:5000/api/checkout/payment";

//user

export {
  allProductsApi,
  categoryProductsApi,
  productApi,
  token,
  checkoutPayment,
  BASE_URL,
};
