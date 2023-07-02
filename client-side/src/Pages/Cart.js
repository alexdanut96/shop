import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const [selectSize, setSelectSize] = React.useState("S");
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
    display: flex;
    padding: 50px;
  `;

  const Hr = styled.hr`
    background-color: #e8e8e8;
    border: none;
    height: 1px;
  `;

  const Right = styled.div`
    flex: 6;
  `;

  const Left = styled.div`
    flex: 4;
  `;

  const Properties = styled.div`
    display: flex;
    justify-content: end;
    font-weight: 500;
    margin-bottom: 16px;
    padding-right: 24px;
  `;

  const Property = styled.div`
    width: 100px;
    display: flex;
    justify-content: center;
    margin-right: 10px;
  `;

  const Item = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
  `;

  const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
  `;

  const Title = styled.div`
    font-weight: 600;
  `;

  const Colors = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    width: 100px;
  `;

  const Color = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: blue;
    cursor: pointer;
  `;

  const Size = styled.div`
    display: flex;
    justify-content: center;
  `;

  const Quantity = styled.div`
    width: 100px;
    display: flex;
    justify-content: space-between;
  `;

  const QuantityBox = styled.div`
    height: 36px;
    border: solid 1px rgba(0, 0, 0, 0.23);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
      color: #024e82;
    }

    .amountIcon {
      cursor: pointer;
    }
  `;

  const Price = styled.div`
    width: 100px;
    display: flex;
    justify-content: center;
    font-weight: 600;
  `;

  const Icon = styled.div`
    display: flex;
    justify-content: center;
  `;

  const ItemLeft = styled.div`
    display: flex;
    gap: 10px;
  `;

  const ItemRight = styled.div`
    display: flex;
    gap: 10px;
  `;

  return (
    <>
      <Navbar />
      <Container>
        <Right>
          <Properties>
            <Property>Color</Property>
            <Property>Size</Property>
            <Property>Quantity</Property>
            <Property>Price</Property>
          </Properties>
          <Hr />
          <Item>
            <ItemLeft>
              <Image src={img1} />
              <Title>Plain White Shirt</Title>
            </ItemLeft>
            <ItemRight>
              <Colors>
                <Color></Color>
                <Color></Color>
                <Color></Color>
              </Colors>
              <Size>
                <FormControl sx={{ m: 0, minWidth: 100 }}>
                  <Select
                    style={{ height: "36px" }}
                    MenuProps={{ disableScrollLock: true }}
                    value={selectSize}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                  </Select>
                </FormControl>
              </Size>

              <Quantity>
                <QuantityBox>
                  <RemoveIcon onClick={decreaseAmount} className="amountIcon" />
                  <span>{amount}</span>
                  <AddIcon onClick={increaseAmount} className="amountIcon" />
                </QuantityBox>
              </Quantity>

              <Price>$29.00</Price>
              <Icon>
                <CloseIcon style={{ cursor: "pointer" }} />
              </Icon>
            </ItemRight>
          </Item>
          <Hr />
          <Item>
            <ItemLeft>
              <Image src={img2} />
              <Title>Denim Jacket</Title>
            </ItemLeft>
            <ItemRight>
              <Colors>
                <Color></Color>
                <Color></Color>
                <Color></Color>
              </Colors>
              <Size>
                <FormControl sx={{ m: 0, minWidth: 100 }}>
                  <Select
                    style={{ height: "36px" }}
                    MenuProps={{ disableScrollLock: true }}
                    value={selectSize}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                  </Select>
                </FormControl>
              </Size>
              <Quantity>
                <QuantityBox>
                  <RemoveIcon onClick={decreaseAmount} className="amountIcon" />
                  <span>{amount}</span>
                  <AddIcon onClick={increaseAmount} className="amountIcon" />
                </QuantityBox>
              </Quantity>
              <Price>$69.00</Price>
              <Icon>
                <CloseIcon />
              </Icon>
            </ItemRight>
          </Item>
          <Hr />
          <Item>
            <ItemLeft>
              <Image src={img3} />
              <Title>Black Polo Shirt</Title>
            </ItemLeft>
            <ItemRight>
              <Colors>
                <Color></Color>
                <Color></Color>
                <Color></Color>
              </Colors>
              <Size>
                <FormControl sx={{ m: 0, minWidth: 100 }}>
                  <Select
                    style={{ height: "36px" }}
                    MenuProps={{ disableScrollLock: true }}
                    value={selectSize}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                  </Select>
                </FormControl>
              </Size>
              <Quantity>
                <QuantityBox>
                  <RemoveIcon onClick={decreaseAmount} className="amountIcon" />
                  <span>{amount}</span>
                  <AddIcon onClick={increaseAmount} className="amountIcon" />
                </QuantityBox>
              </Quantity>
              <Price>$49.00</Price>
              <Icon>
                <CloseIcon />
              </Icon>
            </ItemRight>
          </Item>
        </Right>
        <Left></Left>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
