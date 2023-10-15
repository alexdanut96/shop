import Chart from "../components/chart/Chart";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../components/widgetSm/WidgetSm";
import WidgetLg from "../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react";
import { BASE_URL } from "../ApiRequests";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const token = useSelector((state) => state.user.currentUser.accessToken);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getUserStats = () => {
      fetch(`${BASE_URL}users/stats`, {
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
        .then((data) => {
          data.map((item) =>
            setUserStats((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], "Active User": item.total },
            ])
          );
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

    getUserStats();
  }, [MONTHS, token]);

  return (
    <div className="home-container">
      <FeaturedInfo />
      <Chart
        data={userStats || ""}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
