import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Product = ({ item }) => {
  const Container = styled.div`
    min-width: 295px;
    margin: 10px;
    position: relative;
  `;

  const ActionButtons = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    transition: all 0.5s ease;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  `;

  const Image = styled.img`
    display: block;
  `;

  const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Title = styled.div`
    margin-top: 16px;
    font-weight: 900;
  `;

  const Price = styled.div`
    margin-top: 6px;
    color: #024e82;
    font-weight: 600;
  `;

  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Price>${item.price}</Price>
      </Info>
      <ActionButtons>
        <Icon>
          <VisibilityIcon />
        </Icon>
        <Icon>
          <FavoriteBorderIcon />
        </Icon>
        <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon>
      </ActionButtons>
    </Container>
  );
};

export default Product;
