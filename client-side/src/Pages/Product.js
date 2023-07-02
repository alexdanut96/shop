import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import img from "../images/sasaasaa.png";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Product = () => {
  const [selectSize, setSelectSize] = React.useState("");
  const [amount, setAmount] = React.useState(1);

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleChange = (event) => {
    setSelectSize(event.target.value);
  };

  const Container = styled.div`
    padding: 40px 50px;
  `;

  const Info = styled.div`
    display: flex;
    gap: 40px;
    /* flex-wrap: wrap; */
  `;

  const Image = styled.img`
    flex: 1;
    max-width: 550px;
    max-height: 685px;
  `;

  const ProductInfo = styled.div`
    flex: 1;
  `;

  const Title = styled.h1`
    margin-bottom: 27px;
  `;

  const Price = styled.div`
    margin-bottom: 27px;
    color: #024e82;
    font-size: 24px;
    font-weight: 500;
  `;

  const AboutProduct = styled.div`
    margin-bottom: 36px;
  `;

  const Button = styled.div`
    margin-top: 36px;
    margin-bottom: 32px;
    margin-left: 30px;
    background-color: #024e82;
    color: #ffffff;
    padding: 14px 36px;
    width: fit-content;
    cursor: pointer;
    transition: all 0.5s ease;

    &:hover {
      background-color: #013e68;
    }
  `;

  const Amount = styled.div`
    display: flex;
    align-items: center;

    span {
      display: flex;
      justify-content: center;
      font-size: 32px;
      color: #024e82;
      width: 50px;
    }

    .amountIcon {
      transition: all 0.5s ease;
      font-size: 32px;
      cursor: pointer;
    }
  `;

  const Option = styled.div``;

  const Category = styled.div``;

  const Tags = styled.div``;

  return (
    <>
      <Navbar />
      <Container>
        <Info>
          <Image src={img} />
          <ProductInfo>
            <Title>Plain White Shirt</Title>
            <Price>$59.00</Price>
            <AboutProduct>
              A classic t-shirt never goes out of style. This is our most
              premium collection of shirt. This plain white shirt is made up of
              pure cotton and has a premium finish.
            </AboutProduct>
            <Box sx={{ width: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select size
                </InputLabel>
                <Select
                  MenuProps={{ disableScrollLock: true }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectSize}
                  label="SelectSize"
                  onChange={handleChange}
                >
                  <MenuItem value={"S"}>Small (S)</MenuItem>
                  <MenuItem value={"M"}>Medium (M)</MenuItem>
                  <MenuItem value={"L"}>Large (L)</MenuItem>
                  <MenuItem value={"XL"}>Extra Large (XL)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Amount>
              <RemoveIcon onClick={decreaseAmount} className="amountIcon" />
              <span>{amount}</span>
              <AddIcon onClick={increaseAmount} className="amountIcon" />
              <Button>ADD TO CART</Button>
            </Amount>

            <Category>Category: Women, Polo, Casual</Category>
            <Tags>Tags: Modern, Design, cotton</Tags>
          </ProductInfo>
        </Info>
      </Container>
      <Footer />
    </>
  );
};

export default Product;
