import { useState, useEffect } from "react";
import { BASE_URL } from "../../ApiRequests";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const WidgetLg = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = () => {
      fetch(`${BASE_URL}orders`, {
        method: "GET",
        headers: {
          token: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setOrders(data);
        });
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg-container">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Order Id</th>
            <th className="widgetLgTh">User Id</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className="widgetLgTr">
                <td className="widgetLgOrder">
                  <span className="widgetLgName">{order._id}</span>
                </td>
                <td className="widgetLgUser">
                  <span className="widgetLgName">{order.userId}</span>
                </td>
                <td className="widgetLgDate">{format(order.createdAt)}</td>
                <td className="widgetLgAmount">${order.amount}</td>
                <td className="widgetLgStatus">
                  <Button type={order.status} />
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

export default WidgetLg;
