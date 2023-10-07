import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../ApiRequests";
import { useSelector } from "react-redux";

const FeaturedInfo = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const [income, setIncome] = useState([]);
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const getIncome = () => {
      fetch(`${BASE_URL}orders/income`, {
        method: "GET",
        headers: { token: `Bearer ${token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIncome(data);
          setPercent((data[0].total * 100) / data[1].total - 100);
        });
    };

    getIncome();
  }, []);

  return (
    <div className="featured-container">
      {income && income.length > 0 ? (
        <div className="featuredItem">
          <span className="featuredTitle">Revanue</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${income[0].total}</span>

            <span className="featuredMoneyRate">
              {Math.floor(percent)} %
              {percent < 0 ? (
                <ArrowDownwardIcon className="featuredIcon negative" />
              ) : (
                <ArrowUpwardIcon className="featuredIcon" />
              )}
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      ) : (
        <></>
      )}

      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
