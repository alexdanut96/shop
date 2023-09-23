import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import visaImg from "../images/visa.png";
import mastercardImg from "../images/mastercard.png";
import paypalImg from "../images/paypal.png";
import visaelectronImg from "../images/visaelectron.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="top">
        <div className="category">
          <div className="info">
            <div className="title">COMPANY INFO</div>
            <ul>
              <li>About Us</li>
              <li>Latest Posts</li>
              <li>Contact Us</li>
              <li>Shop</li>
            </ul>
          </div>
        </div>
        <div className="category">
          <div className="info">
            <div className="title">HELP LINKS</div>
            <ul>
              <li>Tracking Order</li>
              <li>Status Delivery </li>
              <li>Shipping Info</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        <div className="category">
          <div className="info">
            <div className="title">USEFUL LINKS</div>
            <ul>
              <li>Special Offers</li>
              <li>Gift Cards</li>
              <li>Advetising</li>
              <li>Terms of Use</li>
            </ul>
          </div>
        </div>
        <div className="category">
          <div className="info">
            <div className="title">GET IN THE KNOW</div>
            <div className="input-box">
              <input placeholder="Enter email" />
              <ArrowForwardIosOutlinedIcon style={{ cursor: "pointer" }} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <div className="policy-info">
          <div className="policy-title">© 2023 Dress-up. eCommerce</div>
          <div className="policy-links">
            <a>Privacy Policy</a>
            <a>Terms & Conditions</a>
          </div>
        </div>
        <div className="payment-options">
          <img src={visaImg} />
          <img src={mastercardImg} />
          <img src={paypalImg} />
          <img src={visaelectronImg} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
