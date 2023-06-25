const Cart = require("../model/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const router = require("express").Router();

// Add new cart to DB
router.post("/new", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const result = await newCart.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err._message);
  }
});

// Edit cart
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const allowedData = ["products"];
  try {
    if (req.params.id) {
      const updatedCart = await Cart.findById(req.params.id);

      Object.entries(req.body).forEach((item) => {
        const dataKeyProperty = item[0].toString();
        let dataValueProperty = JSON.stringify(item[1]);
        console.log(dataKeyProperty, dataValueProperty);

        const allowedProperty = allowedData.find(
          (item) => item === dataKeyProperty
        );

        if (allowedProperty) {
          updatedCart[dataKeyProperty] = JSON.parse(dataValueProperty);
        } else {
          console.log(`"${dataKeyProperty}" doesn't exist in Database`);
        }
      });
      console.log(updatedCart);
      const result = await updatedCart.save();
      res.json(result);
    } else {
      res.status(401).json({ message: "Product Id is required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "ID parameter is required!" });
  }

  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `The cart with ID ${req.params.id} has been deleted!`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err._message);
  }
});

// Get cart
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(foundCart);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allCarts = await Cart.find();
    res.status(200).json(allCarts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
