import { userActions } from "../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_URL } from "../ApiRequests";
import ScrollToTop from "../components/ScrollToTop";
import { format } from "timeago.js";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";

const UserListNew = () => {
  const [users, setUsers] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const deleteUser = (id) => {
    fetch(`${BASE_URL}users/${id}`, {
      method: "DELETE",
      headers: { token: `Bearer ${token}` },
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
      .then((success) => {
        setDeleteConfirmation(!deleteConfirmation);
        return success;
      })
      .then((data) => {
        Swal.fire("Deleted!", data.message, "success");
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

  const handleOpen = (id) => {
    Swal.fire({
      title: `User ID: ${id}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
  };

  const token = useSelector((state) => state.user.currentUser.accessToken);

  const handleUser = (event) => {
    const selectedUser = event.currentTarget;
    const checkbox = selectedUser.childNodes[0].childNodes[0].childNodes[0];

    if (event.target.tagName === "INPUT" && event.target.checked) {
      selectedUser.classList.add("active");
      return;
    } else if (
      event.target.tagName === "INPUT" &&
      event.target.checked === false
    ) {
      selectedUser.classList.remove("active");
      return;
    } else if (
      event.target.tagName === "svg" ||
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "path"
    ) {
      return;
    }

    if (checkbox.checked) {
      selectedUser.classList.remove("active");
      checkbox.checked = false;
    } else {
      selectedUser.classList.add("active");
      checkbox.checked = true;
    }
  };

  const handleSelectAll = (event) => {
    const selectAll = event.currentTarget.checked;
    const users = Array.from(document.querySelectorAll("tr")).slice(1);

    if (selectAll) {
      users.forEach((item) => {
        if (!item.classList.contains("active")) {
          item.click();
        }
      });
    } else {
      users.forEach((item) => {
        if (item.classList.contains("active")) {
          item.click();
        }
      });
    }
  };

  useEffect(() => {
    const getUsers = () => {
      fetch(`${BASE_URL}users`, {
        method: "GET",
        headers: { token: `Bearer ${token}` },
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
        .then((users) => {
          return users;
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
  }, [deleteConfirmation]);

  console.log(users);

  return (
    <div className="user-list-container">
      <Link to="/newUser">
        <AddCircleIcon className="newUser" />
      </Link>
      <ScrollToTop />
      <table>
        <caption>Users List</caption>
        <tbody>
          <tr>
            <th>
              <div className="input-th">
                <input onClick={handleSelectAll} type="checkbox" />
                <div>All</div>
              </div>
            </th>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>

          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr onClick={handleUser} key={user._id}>
                <td>
                  <div className="input-td">
                    <input type="checkbox" />
                    <span>{index + 1}</span>
                  </div>
                </td>
                <td data-cell="ID:">{user._id}</td>
                <td data-cell="User:">
                  <div className="user-td">
                    <img
                      src={
                        user.profilePicture ||
                        "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                      }
                      alt=""
                    />
                    <span>{user.username}</span>
                  </div>
                </td>
                <td data-cell="Email:">{user.email}</td>
                <td data-cell="Created at:">{format(user.createdAt)}</td>
                <td>
                  <div className="action-buttons">
                    <button>Edit</button>
                    <DeleteOutlineIcon onClick={() => handleOpen(user._id)} />
                    {/* <ModalPopup /> */}
                  </div>
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

export default UserListNew;
