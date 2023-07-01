import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Pay() {
  const navigate = useNavigate();
  const KEY =
    "pk_test_51MFCABHZgeYEdt091ZO1RiskSAzuvG2Y2DnQyNW32G7jeN8uIQJuyNCIECWx0LDFyKYHuRrVF16ySjaDrGymeS3p00cOpl5rEP";

  const URL = "http://localhost:5000/checkout/payment";

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(URL, {
          tokenId: stripeToken.id,
          amount: 4000,
        });
        console.log(res.data);
        navigate("/success");
      } catch (err) {
        console.log(err);
      }
    };
    console.log(stripeToken);
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <div className="Pay">
      {stripeToken ? (
        <div>Processing...</div>
      ) : (
        <StripeCheckout
          name="e-comm"
          image="https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif"
          billingAddress
          shippingAddress
          description="Total $40"
          amount={4000}
          token={onToken}
          stripeKey={KEY}
        >
          <button>Pay</button>
        </StripeCheckout>
      )}
    </div>
  );
}

export default Pay;
