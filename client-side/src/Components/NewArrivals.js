import styled from "styled-components";
import Products from "./Products";

const Container = styled.div`
  margin-top: 42px;
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 20px;
  text-align: center;
`;
const Subtitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #555555;
`;

const NewArrivals = () => {
  return (
    <Container>
      <Title>Discover NEW Arrivals</Title>
      <Subtitle>Recently added shirts</Subtitle>
      <Products />
    </Container>
  );
};

export default NewArrivals;
