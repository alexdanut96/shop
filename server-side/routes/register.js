const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../model/User");
const CrypyoJS = require("crypto-js");

// Register
router.post("/", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All the fields are required!" });
  }

  const newUser = new User({
    username: username,
    email: email,
    password: CrypyoJS.AES.encrypt(
      password,
      process.env.HASHED_PASSWORD
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
