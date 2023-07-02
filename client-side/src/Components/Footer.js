import styled from "styled-components";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import visaImg from "../images/visa.png";
import mastercardImg from "../images/mastercard.png";
import paypalImg from "../images/paypal.png";
import visaelectronImg from "../images/visaelectron.png";

const Footer = () => {
  const Container = styled.div`
    background: #fbfbfb;
    padding: 50px;
  `;
  const Top = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 70px;
  `;
  const Bottom = styled.div`
    padding-top: 32px;
    display: flex;
    justify-content: space-between;
  `;

  const Category = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `;

  const Info = styled.div``;

  const Title = styled.div`
    margin-bottom: 30px;
    font-weight: 600;
  `;

  const List = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 7px;
  `;

  const ListElement = styled.li`
    color: #1d1d1d;
    border-bottom: 1px solid #fbfbfb;
    cursor: pointer;
    transition: all 0.5s ease;
    width: fit-content;

    &:hover {
      border-bottom: 1px solid #bcbcbc;
    }
  `;

  const Input = styled.input`
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: solid 1px #1d1d1d;
    background: inherit;
    margin-right: 5px;
    outline: none;
    height: 100%;
    font-size: 1rem;
  `;

  const Hr = styled.hr`
    background-color: #e8e8e8;
    border: none;
    height: 1px;
  `;

  const InputBox = styled.div`
    max-width: 250px;
    height: 40px;
    display: flex;
    align-items: center;
  `;

  const PaymentOptions = styled.div`
    display: flex;
    gap: 16px;
  `;

  const Icon = styled.div`
    border: solid purple;
  `;

  const PolicyInfo = styled.div``;

  const PolicyTitle = styled.div`
    margin-bottom: 10px;
  `;

  const PolicyLinks = styled.div`
    display: flex;
    gap: 10px;
  `;

  const PrivacyPolicy = styled.a`
    border-bottom: 1px solid #bcbcbc;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid #024e82;
      color: #024e82;
    }
  `;

  const TermsAndConditions = styled.a`
    border-bottom: 1px solid #bcbcbc;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid #024e82;
      color: #024e82;
    }
  `;

  const Image = styled.img`
    max-width: 58px;
    object-fit: cover;
  `;

  return (
    <Container>
      <Top>
        <Category>
          <Info>
            <Title>COMPANY INFO</Title>
            <List>
              <ListElement>About Us</ListElement>
              <ListElement>Latest Posts</ListElement>
              <ListElement>Contact Us</ListElement>
              <ListElement>Shop</ListElement>
            </List>
          </Info>
        </Category>
        <Category>
          <Info>
            <Title>HELP LINKS</Title>
            <List>
              <ListElement>Tracking Order</ListElement>
              <ListElement>Status Delivery </ListElement>
              <ListElement>Shipping Info</ListElement>
              <ListElement>FAQ</ListElement>
            </List>
          </Info>
        </Category>
        <Category>
          <Info>
            <Title>USEFUL LINKS</Title>
            <List>
              <ListElement>Special Offers</ListElement>
              <ListElement>Gift Cards</ListElement>
              <ListElement>Advetising</ListElement>
              <ListElement>Terms of Use</ListElement>
            </List>
          </Info>
        </Category>
        <Category>
          <Info>
            <Title>GET IN THE KNOW</Title>
            <InputBox>
              <Input placeholder="Enter email" />
              <ArrowForwardIosOutlinedIcon style={{ cursor: "pointer" }} />
            </InputBox>
          </Info>
        </Category>
      </Top>
      <Hr />
      <Bottom>
        <PolicyInfo>
          <PolicyTitle>© 2023 Dress-up. eCommerce</PolicyTitle>
          <PolicyLinks>
            <PrivacyPolicy>Privacy Policy</PrivacyPolicy>
            <TermsAndConditions>Terms & Conditions</TermsAndConditions>
          </PolicyLinks>
        </PolicyInfo>
        <PaymentOptions>
          <Image src={visaImg} />
          <Image src={mastercardImg} />
          <Image src={paypalImg} />
          <Image src={visaelectronImg} />
        </PaymentOptions>
      </Bottom>
    </Container>
  );
};

export default Footer;
