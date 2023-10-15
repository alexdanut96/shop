import { useState, useEffect } from "react";
import { BASE_URL } from "../../ApiRequests";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import Swal from "sweetalert2";

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
          setOrders(data);
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
    getOrders();
  }, [token]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg-container">
      <table>
        <caption>Latest transactions</caption>
        <tbody>
          <tr>
            <th>Order Id</th>
            <th>User Id</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td data-cell="order-id">{order._id}</td>
                <td data-cell="user-idi">{order.userId}</td>
                <td data-cell="order-date">{format(order.createdAt)}</td>
                <td data-cell="order-price">${order.amount}</td>
                <td data-cell="order-status">
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
