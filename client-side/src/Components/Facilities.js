import styled from "styled-components";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

const Facilities = () => {
  const Container = styled.div`
    padding: 50px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  `;
  const Facility = styled.div`
    display: flex;
    gap: 10px;
    flex: 1;
  `;
  const Icon = styled.div`
    color: #024e82;
  `;
  const Info = styled.div``;
  const Title = styled.div`
    font-weight: 900;
    margin-bottom: 8px;
  `;
  const Description = styled.div`
    color: #555555;
  `;

  return (
    <Container>
      <Facility>
        <Icon>
          <LocalShippingOutlinedIcon />
        </Icon>
        <Info>
          <Title>FREE SHIPPING</Title>
          <Description>
            Enjoy free shipping on all orders above $100
          </Description>
        </Info>
      </Facility>
      <Facility>
        <Icon>
          <ContactSupportOutlinedIcon />
        </Icon>
        <Info>
          <Title>SUPPORT 24/7</Title>
          <Description>
            Our support team is there to help you for queries
          </Description>
        </Info>
      </Facility>
      <Facility>
        <Icon>
          <ReplayOutlinedIcon />
        </Icon>
        <Info>
          <Title>30 DAYS RETURN</Title>
          <Description>
            Simply return it within 30 days for an exchange.
          </Description>
        </Info>
      </Facility>
      <Facility>
        <Icon>
          <ShieldOutlinedIcon />
        </Icon>
        <Info>
          <Title>100% PAYMENT SECURE</Title>
          <Description>
            Our payments are secured with 256 bit encryption
          </Description>
        </Info>
      </Facility>
    </Container>
  );
};

export default Facilities;
