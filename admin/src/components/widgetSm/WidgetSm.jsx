import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../ApiRequests";
import { useSelector } from "react-redux";

const WidgetSm = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = () => {
      fetch(`${BASE_URL}users?new=true`, {
        method: "GET",
        headers: {
          token: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUsers(data);
        });
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm-container">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="widgetSmListItem">
              <img
                src={
                  user.profilePicture ||
                  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
                <span className="widgetSmUserTitle">{user.email}</span>
              </div>
              <button className="widgetSmButton">
                <VisibilityIcon className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default WidgetSm;
