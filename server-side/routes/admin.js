const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const User = require("../model/User");

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  return res.status(200).json({});
});

module.exports = router;
