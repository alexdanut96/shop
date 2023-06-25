const Order = require("../model/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const router = require("express").Router();

// Add new order to DB
router.post("/new", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const result = await newOrder.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err._message);
  }
});

// Edit order
router.post("/:id", verifyTokenAndAdmin, async (req, res) => {
  const allowedData = ["userId", "products", "amount", "address", "status"];
  try {
    if (req.params.id) {
      const updatedOrder = await Order.findById(req.params.id);

      Object.entries(req.body).forEach((item) => {
        const dataKeyProperty = item[0].toString();
        let dataValueProperty = JSON.stringify(item[1]);
        console.log(dataKeyProperty, dataValueProperty);

        const allowedProperty = allowedData.find(
          (item) => item === dataKeyProperty
        );

        if (allowedProperty) {
          updatedOrder[dataKeyProperty] = JSON.parse(dataValueProperty);
        } else {
          console.log(`"${dataKeyProperty}" doesn't exist in Database`);
        }
      });
      console.log(updatedOrder);
      const result = await updatedOrder.save();
      res.json(result);
    } else {
      res.status(401).json({ message: "Product Id is required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "ID parameter is required!" });
  }

  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `The cart with ID ${req.params.id} has been deleted!`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err._message);
  }
});

// Get order
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundOrder = await Order.findOne({ userId: req.params.id });
    res.status(200).json(foundOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
