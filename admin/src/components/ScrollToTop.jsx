import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  window.addEventListener("scroll", () => {
    window.scrollY > 100 ? setVisible(true) : setVisible(false);
  });

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <a href="#">
      <div className={`scrollToTop ${visible ? "visible" : ""}`}>
        <KeyboardArrowUpIcon style={{ color: "white" }} />
      </div>
    </a>
  );
};

export default ScrollToTop;
