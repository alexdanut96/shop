import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../ApiRequests";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import ScrollToTop from "../components/ScrollToTop";
import Swal from "sweetalert2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductList = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const [products, setProducts] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleSelectAll = (event) => {
    const selectAll = event.currentTarget.checked;
    const products = Array.from(document.querySelectorAll("tr")).slice(1);

    if (selectAll) {
      products.forEach((item) => {
        if (!item.classList.contains("active")) {
          item.click();
        }
      });
    } else {
      products.forEach((item) => {
        if (item.classList.contains("active")) {
          item.click();
        }
      });
    }
  };

  const handleUser = (event) => {
    const selectedProduct = event.currentTarget;
    const checkbox = selectedProduct.childNodes[0].childNodes[0].childNodes[0];

    if (event.target.tagName === "INPUT" && event.target.checked) {
      selectedProduct.classList.add("active");
      return;
    } else if (
      event.target.tagName === "INPUT" &&
      event.target.checked === false
    ) {
      selectedProduct.classList.remove("active");
      return;
    } else if (
      event.target.tagName === "svg" ||
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "path"
    ) {
      return;
    }

    if (checkbox.checked) {
      selectedProduct.classList.remove("active");
      checkbox.checked = false;
    } else {
      selectedProduct.classList.add("active");
      checkbox.checked = true;
    }
  };

  useEffect(() => {
    const getProducts = () => {
      fetch(`${BASE_URL}products`, {
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
          setProducts(data);
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

    getProducts();
  }, [deleteConfirmation]);

  console.log(products);
  return (
    <div className="right-side-container">
      <div className="product-list-container animated">
        {products && products.length > 0 ? (
          <>
            <Link to="/newproduct">
              <Tooltip title="add product" placement="left" arrow>
                <AddCircleIcon className="newProduct" />
              </Tooltip>
            </Link>
            <ScrollToTop />
            <table>
              <caption>Products List</caption>
              <tbody>
                <tr>
                  <th>
                    <div className="input-th">
                      <input onClick={handleSelectAll} type="checkbox" />
                      <div>All</div>
                    </div>
                  </th>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Created at</th>
                  <th>Action</th>
                </tr>

                {products.map((product, index) => (
                  <tr onClick={handleUser} key={product._id}>
                    <td>
                      <div className="input-td">
                        <input type="checkbox" />
                        <span>{index + 1}</span>
                      </div>
                    </td>
                    <td data-cell="ID:">
                      <div className="td-text">{product._id}</div>
                    </td>
                    <td data-cell="Product:">
                      <div className="product-td">
                        <img
                          src={
                            product.image ||
                            "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                          }
                          alt=""
                        />
                        <span className="td-text">{product.title}</span>
                      </div>
                    </td>
                    <td data-cell="Price:">
                      <div className="td-text">{product.price}</div>
                    </td>
                    <td data-cell="Stock:">
                      <div className="td-text">
                        {product.inStock ? "Yes" : "No"}
                      </div>
                    </td>
                    <td data-cell="Created at:">
                      <div className="td-text">{format(product.createdAt)}</div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/product/details/${product._id}`}>
                          <div className="edit-button">
                            <Tooltip title="view more" placement="top" arrow>
                              <VisibilityIcon />
                            </Tooltip>
                          </div>
                        </Link>
                        <div
                          // onClick={() => handleOpen(user._id)}
                          className="delete-button"
                        >
                          <Tooltip title="delete product" placement="top" arrow>
                            <DeleteOutlineOutlinedIcon />
                          </Tooltip>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
