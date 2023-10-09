import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import adminAvatar from "../../images/admin-avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../../Redux/SidebarSlice";

export default function Topbar() {
  const sidebarStatus = useSelector((state) => state.sidebar.sidebar);
  const dispatch = useDispatch();

  const handleSidebar = () => {
    if (sidebarStatus) {
      dispatch(sidebarActions.hide());
    } else {
      dispatch(sidebarActions.show());
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <MenuIcon onClick={handleSidebar} className="menu-icon" />
          <span className="logo">Dress-up Admin</span>
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
}
