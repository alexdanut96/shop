import { BASE_URL } from "../ApiRequests";

const checkAdmin = async (token) => {
  return await fetch(`${BASE_URL}admin`, {
    method: "GET",
    headers: { token: `Bearer ${token}` },
  })
    .then((response) => {
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default checkAdmin;
