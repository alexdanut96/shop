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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTUzZjUxNzA4ZDk5NjA1OTVlZWQ0ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MzY2NTQ1NywiZXhwIjoxNjkzOTI0NjU3fQ.sq5JgWccEPd2oRt0GSgesEGk6H3TqxCcdGibr_mtl8s",
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
  return (
    <Container>
      {products ? (
        products.map((item) => <Product item={item} key={item._id} />)
      ) : (
        <Loader>
          <span class="loader"></span>
        </Loader>
      )}
    </Container>
  );
};

export default Products;
