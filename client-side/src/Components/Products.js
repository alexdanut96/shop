import { useEffect, useState } from "react";
import Product from "./Product";
import Swal from "sweetalert2";
import { token, BASE_URL } from "../ApiRequests";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const baseUrl = `${BASE_URL}products`;
    const categoryUrl = `${BASE_URL}products?category=${cat}`;

    const getProducts = () => {
      fetch(cat ? categoryUrl : baseUrl, {
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
        .then((products) => {
          return products;
        })
        .then((data) => {
          setProducts(data);
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
