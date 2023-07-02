import styled from "styled-components";
import { popularProducts } from "../data/Items";
import Product from "./Product";

const Products = () => {
  const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    /* gap: 48px; */
    padding: 50px;
    justify-content: center;
  `;

  return (
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
