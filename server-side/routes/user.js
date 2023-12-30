const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../model/User");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

// Get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const allUsers = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      return res.status(410).json({
        message: `User with ID "${req.params.id}" is no longer available!`,
      });
    }
    res.status(200).json(foundUser);
  } catch (err) {
    console.log(err);
    if (err.name === "CastError") {
      err = { message: `User ID "${req.params.id}" is invalid!` };
    }
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const allowedData = [
    "username",
    "email",
    "password",
    "profilePicture",
    "address",
    "phoneNumber",
    "countryCode",
  ];
  try {
    if (req.params.id) {
      const foundUser = await User.findById(req.params.id);

      Object.entries(req.body).forEach((item) => {
        const dataKeyProperty = item[0].toString();
        let dataValueProperty = item[1];

        const allowedProperty = allowedData.find(
          (item) => item === dataKeyProperty
        );

        if (allowedProperty) {
          if (allowedProperty === "password") {
            dataValueProperty = CryptoJS.AES.encrypt(
              dataValueProperty,
              process.env.HASHED_PASSWORD
            ).toString();
          }
          foundUser[dataKeyProperty] = dataValueProperty;
        } else {
          console.log(`"${dataKeyProperty}" doesn't exist in Database`);
        }
      });

      const result = await foundUser.save();
      res.json(result);
    } else {
      res.status(401).json({ message: "User Id is required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({
        message: `User with the ID "${req.params.id}" has been deleted!`,
      });
  } catch (err) {
    console.log(err);
    if (err.name === "CastError") {
      err = {
        message: `Cannot delete! User ID "${req.params.id}" is invalid!`,
      };
    }
    res.status(500).json(err);
  }
});

// Get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
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

    let sortedData = data.sort((p1, p2) =>
      p1._id < p2._id ? -1 : p1._id > p2._id ? 1 : 0
    );

    res.status(200).json(sortedData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
