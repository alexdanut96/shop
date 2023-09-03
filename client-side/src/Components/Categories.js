import styled from "styled-components";
import { categories } from "../data/Items.js";
import CategoryItem from "./CategoryItem.js";

const Container = styled.div`
  margin-top: 42px;
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 20px;
  text-align: center;
`;

const CategoryContainer = styled.div`
  padding: 50px;
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const Categories = () => {
  return (
    <Container>
      <Title>Choose your category</Title>
      <CategoryContainer>
        {categories
          ? categories.map((item) => <CategoryItem item={item} key={item.id} />)
          : ""}
      </CategoryContainer>
    </Container>
  );
};

export default Categories;
