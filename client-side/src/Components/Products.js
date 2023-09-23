import { useEffect, useState } from "react";
import Product from "./Product";
import Swal from "sweetalert2";
import { allProductsApi, categoryProductsApi, token } from "../ApiRequests";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const baseUrl = allProductsApi;
    const categoryUrl = `${categoryProductsApi}${cat}`;
    const getProducts = () => {
      fetch(cat ? categoryUrl : baseUrl, {
        method: "GET",
        headers: {
          token: token,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
        })
        .then((products) => {
          return products;
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          console.error(err.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong! ${err.message}`,
            footer: '<a href="/">Why do I have this issue?</a>',
          });
        });
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value);
          })
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "priceAsc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "priceDesc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <div className="products-container">
      {products && products.length ? (
        cat ? (
          filteredProducts.map((item) => <Product item={item} key={item._id} />)
        ) : (
          products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)
        )
      ) : (
        <div className="loader">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default Products;
