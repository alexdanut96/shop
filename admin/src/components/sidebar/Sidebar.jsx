import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReportIcon from "@mui/icons-material/Report";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../Redux/UserSlice";
import { sidebarActions } from "../../Redux/SidebarSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const isActive = useSelector((state) => state.sidebar.sidebar);
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const logout = () => {
    dispatch(userActions.logout());
  };

  useEffect(() => {
    dispatch(sidebarActions.hide());
  }, [location]);

  //side bar options

  const dashboardOptions = [
    {
      name: "Home",
      href: `/`,
      icon: <LineStyleIcon className="sidebarIcon" />,
    },
    {
      name: "Analytics",
      href: `/analytics`,
      icon: <TimelineIcon className="sidebarIcon" />,
    },
    {
      name: "Sales",
      href: `/sales`,
      icon: <TrendingUpIcon className="sidebarIcon" />,
    },
  ];

  const quickMenuOptions = [
    {
      name: "Users",
      href: `/users`,
      icon: <PermIdentityIcon className="sidebarIcon" />,
    },
    {
      name: "Products",
      href: `/products`,
      icon: <StorefrontIcon className="sidebarIcon" />,
    },
    {
      name: "Transactions",
      href: `/transactions`,
      icon: <AttachMoneyIcon className="sidebarIcon" />,
    },
    {
      name: "Reports",
      href: `/reports`,
      icon: <BarChartIcon className="sidebarIcon" />,
    },
  ];

  const notificationsOptions = [
    {
      name: "Mail",
      href: `/mail`,
      icon: <MailOutlineIcon className="sidebarIcon" />,
    },
    {
      name: "Feedback",
      href: `/feedback`,
      icon: <DynamicFeedIcon className="sidebarIcon" />,
    },
    {
      name: "Messages",
      href: `/messages`,
      icon: <ChatBubbleOutlineIcon className="sidebarIcon" />,
    },
  ];

  const staffOptions = [
    {
      name: "Manage",
      href: `/staff-manage`,
      icon: <WorkOutlineIcon className="sidebarIcon" />,
    },
    {
      name: "Analytics",
      href: `/staff-analytics`,
      icon: <TimelineIcon className="sidebarIcon" />,
    },
    {
      name: "Reports",
      href: `/staff-reports`,
      icon: <ReportIcon className="sidebarIcon" />,
    },
  ];

  //side bar options

  return (
    <div
      className={`sidebar sidebar-mobile animated ${isActive ? "active" : ""}`}
    >
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <div className="sidebarList">
            {dashboardOptions.map((option) => {
              return (
                <NavLink
                  className="sidebarListItem"
                  key={option.name}
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#80b2fc" : "",
                      color: isActive ? "color" : "",
                    };
                  }}
                  to={option.href}
                >
                  {option.icon}
                  {option.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <div className="sidebarList">
            {quickMenuOptions.map((option) => {
              return (
                <NavLink
                  className="sidebarListItem"
                  key={option.name}
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#80b2fc" : "",
                      color: isActive ? "color" : "",
                    };
                  }}
                  to={option.href}
                >
                  {option.icon}
                  {option.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <div className="sidebarList">
            {notificationsOptions.map((option) => {
              return (
                <NavLink
                  className="sidebarListItem"
                  key={option.name}
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#80b2fc" : "",
                      color: isActive ? "color" : "",
                    };
                  }}
                  to={option.href}
                >
                  {option.icon}
                  {option.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <div className="sidebarList">
            {staffOptions.map((option) => {
              return (
                <NavLink
                  className="sidebarListItem"
                  key={option.name}
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#80b2fc" : "",
                      color: isActive ? "color" : "",
                    };
                  }}
                  to={option.href}
                >
                  {option.icon}
                  {option.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="sidebarMenu">
          <div className="button-wrapper">
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
