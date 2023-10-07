import { userActions } from "./UserSlice";
import { BASE_URL } from "../ApiRequests";
import Swal from "sweetalert2";

export const login = async (dispatch, user) => {
  dispatch(userActions.loginStart());
  try {
    await fetch(`${BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();

          case 400:
          case 401:
            return response.json().then((error) => {
              throw new Error(error.message);
            });

          default:
            throw new Error(`Please contact the development departament!`);
        }
      })
      .then((data) => {
        if (!data.isAdmin)
          throw new Error(`Only admin can access this platform!`);
        dispatch(userActions.loginSuccess(data));
      });
  } catch (error) {
    dispatch(userActions.loginFailure());
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Something went wrong! ${error.message}`,
      footer: '<a href="/">Go back to home page</a>',
    });
  }
};
