import { Alert } from "@mui/material";

const Alerts = ({ type, message, variant = null }) => {
  return (
    <div className="alerts">
      {variant ? (
        <Alert variant={variant} severity={type}>
          {message}
        </Alert>
      ) : (
        <Alert severity={type}>{message}</Alert>
      )}
    </div>
  );
};

//types:{error, warning, info, success}

export default Alerts;
