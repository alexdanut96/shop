import styled from "styled-components";
import { useEffect, useState } from "react";
import Product from "./Product";

const Container = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  /* gap: 48px; */
  padding: 50px;
  justify-content: center;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const baseUrl = "http://localhost:5000/products";
    const categoryUrl = `http://localhost:5000/products?category=${cat}`;
    const getProducts = () => {
      fetch(cat ? categoryUrl : baseUrl, {
        method: "GET",
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTUzZjUxNzA4ZDk5NjA1OTVlZWQ0ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NDk1MTI5MywiZXhwIjoxNjk1MjEwNDkzfQ.qdX3EGFaWLqHQxtmpm4uC7FIjPEZkHLLAvND9zDZ748",
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
          console.log(data);
        })
        .catch((err) => console.error(err));
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
      console.log(filteredProducts);
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
    <Container>
      {products && products.length ? (
        cat ? (
          filteredProducts.map((item) => <Product item={item} key={item._id} />)
        ) : window.location.pathname !== "/products" ? (
          products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)
        ) : (
          products.map((item) => <Product item={item} key={item._id} />)
        )
      ) : (
        <Loader>
          <span className="loader"></span>
        </Loader>
      )}
    </Container>
  );
};

export default Products;
