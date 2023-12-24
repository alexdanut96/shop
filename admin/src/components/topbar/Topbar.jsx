import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import adminAvatar from "../../images/admin-avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../../Redux/SidebarSlice";
import { Link } from "react-router-dom";

const Topbar = () => {
  const sidebarStatus = useSelector((state) => state.sidebar.sidebar);
  const dispatch = useDispatch();

  const handleSidebar = () => {
    if (sidebarStatus) {
      dispatch(sidebarActions.hide());
    } else {
      dispatch(sidebarActions.show());
      // const demo = document.querySelector(".window");

      // demo.addEventListener("click", () => {
      //   console.log("demo");
      // });
    }
  };

  return (
    <div className="topbar animated">
      <div className="topbarWrapper">
        <div className="topLeft">
          {sidebarStatus ? (
            <CloseIcon onClick={handleSidebar} className="menu-icon" />
          ) : (
            <MenuIcon onClick={handleSidebar} className="menu-icon" />
          )}

          <Link to="/">
            <span className="logo">Dress-up Admin</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img src={adminAvatar} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
};
export default Topbar;
