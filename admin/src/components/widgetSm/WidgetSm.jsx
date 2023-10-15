import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../ApiRequests";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

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
          switch (response.status) {
            case 200:
              return response.json();

            case 400:
            case 401:
            case 403:
              return response.json().then((error) => {
                throw new Error(error.message);
              });

            default:
              throw new Error(`Please contact the development departament!`);
          }
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error(error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong! ${error.message}`,
            footer: '<a href="/">Go back to home page</a>',
          });
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
