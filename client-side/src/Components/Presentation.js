import styled from "styled-components";
import img from "../images/img_1.png";

const Container = styled.div``;

const ImageBox = styled.div`
  background-image: url(${img});
  background-size: cover;
  height: 650px;
  position: relative;
`;

const ImageInfo = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  padding-right: 100px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
`;

const Button = styled.button`
  border-left: 3.5px white solid;
  border-top: 3.5px white solid;
  border-right: 3.5px white solid;
  border-bottom: 3.5px white solid;
  padding: 18px 36px;
  background: transparent;
  color: white;
  font-weight: 900;
  font-size: 21px;
  cursor: pointer;
`;

// const Container = styled.div``;
// const Container = styled.div``;

const Presentation = () => {
  return (
    <Container>
      <ImageBox>
        <ImageInfo>
          <Title>STYLIST PICKS BEAT THE HEAT</Title>
          <Button>SHOP NOW</Button>
        </ImageInfo>
      </ImageBox>
    </Container>
  );
};

export default Presentation;
