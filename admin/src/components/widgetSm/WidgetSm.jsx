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
  }, [token]);

  return (
    <div className="widgetSm-container">
      <table>
        <caption>New Join Members</caption>
        <tbody>
          <tr>
            <th>Profile picture</th>
            <th>Username</th>
            <th>Email</th>
            <th>More</th>
          </tr>

          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td data-cell="Profile picture">
                  <img
                    src={
                      user.profilePicture ||
                      "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                  />
                </td>
                <td data-cell="Username">{user.username}</td>
                <td data-cell="Email">{user.email}</td>
                <td data-cell="More">
                  <button className="widgetSmButton">
                    <VisibilityIcon className="widgetSmIcon" />
                    Display
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WidgetSm;
