const allProductsApi = "http://localhost:5000/api/products";
const productApi = "http://localhost:5000/api/products/find/";
const categoryProductsApi = "http://localhost:5000/api/products?category=";
const token = process.env.REACT_APP_TOKEN;

export { allProductsApi, categoryProductsApi, productApi, token };
