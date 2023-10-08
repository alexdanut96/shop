import Chart from "../components/chart/Chart";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
// import { userData } from "../dummyData";
import WidgetSm from "../components/widgetSm/WidgetSm";
import WidgetLg from "../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react";
import { BASE_URL } from "../ApiRequests";
import { useSelector } from "react-redux";

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
    const getUserStats = async () => {
      await fetch(`${BASE_URL}users/stats`, {
        method: "GET",
        headers: { token: `Bearer ${token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.map((item) =>
            setUserStats((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], "Active User": item.total },
            ])
          );
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
