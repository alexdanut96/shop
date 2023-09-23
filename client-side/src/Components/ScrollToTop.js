import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  window.addEventListener("scroll", () => {
    window.scrollY > 100 ? setVisible(true) : setVisible(false);
  });

  const { pathname } = useLocation();

  useEffect(() => {
    console.log("asasas");
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <a href="#">
      <div className={`scrollToTop ${visible ? "visible" : ""}`}>
        <KeyboardArrowUpIcon style={{ color: "white" }} />
      </div>
    </a>
  );
}
