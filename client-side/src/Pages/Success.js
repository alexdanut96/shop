import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  return (
    <div className="Success">
      Your payment have been successfully finalized!
    </div>
  );
}

export default Success;
