const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const registerRoute = require("./routes/register");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const billingRoute = require("./routes/billing");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const adminRoute = require("./routes/admin");

const cors = require("cors");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/register", registerRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/billing", billingRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
