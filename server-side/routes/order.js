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
  const lastMonth = new Date(date.setMonth(date.getMonth()));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  console.log(lastMonth.getMonth());
  try {
    let income = await Order.aggregate([
      {
        $project: { month: { $month: "$createdAt" }, sales: "$amount" },
      },
      { $match: { month: { $gte: lastMonth.getMonth() } } },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    console.log(income);
    // let income = await Order.aggregate([
    //   { $match: { createdAt: { $gte: previousMonth } } },
    //   {
    //     $project: {
    //       month: { $month: "$createdAt" },
    //       sales: "$amount",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$month",
    //       total: { $sum: "$sales" },
    //     },
    //   },
    // ]);

    // console.log(income);

    if (income.length === 0) {
      income.push({ _id: lastMonth.getMonth(), total: 0 });
    }

    if (income.length === 1) {
      if (income[0]._id === lastMonth.getMonth()) {
        income.push({ _id: income[0]._id + 1, total: 0 });
      } else {
        income.push({ _id: income[0]._id - 1, total: 0 });
      }
    }

    let sortedIncome = income.sort((p1, p2) =>
      p1._id < p2._id ? 1 : p1._id > p2._id ? -1 : 0
    );
    console.log(sortedIncome);
    res.status(200).json(sortedIncome);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
