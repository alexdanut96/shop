import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

const Facilities = () => {
  return (
    <div className="facilities-container">
      <div className="facility">
        <div className="icon">
          <LocalShippingOutlinedIcon />
        </div>
        <div className="info">
          <div className="title">FREE SHIPPING</div>
          <div className="description">
            Enjoy free shipping on all orders above $100
          </div>
        </div>
      </div>
      <div className="facility">
        <div className="icon">
          <ContactSupportOutlinedIcon />
        </div>
        <div className="info">
          <div className="title">SUPPORT 24/7</div>
          <div className="description">
            Our support team is there to help you for queries
          </div>
        </div>
      </div>
      <div className="facility">
        <div className="icon">
          <ReplayOutlinedIcon />
        </div>
        <div className="info">
          <div className="title">30 DAYS RETURN</div>
          <div className="description">
            Simply return it within 30 days for an exchange.
          </div>
        </div>
      </div>
      <div className="facility">
        <div className="icon">
          <ShieldOutlinedIcon />
        </div>
        <div className="info">
          <div className="title">100% PAYMENT SECURE</div>
          <div className="description">
            Our payments are secured with 256 bit encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
