import React from "react";

const NotFound404 = () => {
  return (
    <div className="right-side-container">
      <div
        style={{
          height: "calc(100vh - 110px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "26px",
          fontWeight: "bold",
          color: "gray",
          textAlign: "center",
        }}
      >
        404 Page not found!
      </div>
    </div>
  );
};

export default NotFound404;
