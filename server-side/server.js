const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const registerRoute = require("./routes/register");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/checkout", stripeRoute);

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
