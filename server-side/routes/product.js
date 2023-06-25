const Product = require("../model/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const router = require("express").Router();

// Add new product to DB
router.post("/new", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const result = await newProduct.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err._message);
  }
});

// Edit product
router.post("/:id", verifyTokenAndAdmin, async (req, res) => {
  const allowedData = [
    "title",
    "description",
    "image",
    "categories",
    "size",
    "color",
    "price",
  ];
  try {
    if (req.params.id) {
      const updatedProduct = await Product.findById(req.params.id);

      Object.entries(req.body).forEach((item) => {
        const dataKeyProperty = item[0].toString();
        let dataValueProperty = item[1].toString();

        const allowedProperty = allowedData.find(
          (item) => item === dataKeyProperty
        );

        if (allowedProperty) {
          updatedProduct[dataKeyProperty] = dataValueProperty;
        } else {
          console.log(`"${dataKeyProperty}" doesn't exist in Database`);
        }
      });
      console.log(updatedProduct);
      const result = await updatedProduct.save();
      res.json(result);
    } else {
      res.status(401).json({ message: "Product Id is required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: "ID parameter is required!" });
  }

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `The product with ID ${req.params.id} has been deleted!`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err._message);
  }
});

// Get product
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    res.status(200).json(foundProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all products
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const qCategory = req.query.category;
  const qNew = req.query.new;
  try {
    let result;
    if (qCategory) {
      result = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (qNew) {
      result = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else {
      result = await Product.find();
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get products stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Product.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
