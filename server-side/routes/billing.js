const Billing = require("../model/Billing");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const router = require("express").Router();
const fns = require("date-fns");

// Get billing
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const foundBill = await Billing.findOne({ userId: req.params.id });
    res.status(200).json(foundBill);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add new billing
router.post("/new", verifyTokenAndAdmin, async (req, res) => {
  // const newBill = new Billing(req.body);
  try {
    const foundBill = await Billing.findOne({ userId: req.body.userId });
    if (foundBill) {
      const alreadyExists = foundBill.address.find((address) => {
        // console.log(address.phoneNumber.toString());
        // console.log(req.body.address[0].phoneNumber.toString());

        if (
          Object.entries(address).length ===
          Object.entries(req.body.address[0]).length
        ) {
          if (
            address.postalCode.toString() ===
              req.body.address[0].postalCode.toString() &&
            address.country.toString() ===
              req.body.address[0].country.toString() &&
            address.city.toString() === req.body.address[0].city.toString() &&
            address.street.toString() ===
              req.body.address[0].street.toString() &&
            address.phoneNumber.toString() ===
              req.body.address[0].phoneNumber.toString() &&
            address.name.toString() === req.body.address[0].name.toString() &&
            address.countryCode.toString() ===
              req.body.address[0].countryCode.toString()
          ) {
            return address;
          }
        }
      });
      if (alreadyExists) {
        return res.status(403).json({ message: "Bill already exists" });
      }

      foundBill.address.push(req.body.address[0]);
      const result = await foundBill.save();
      res.json(result);
    }

    // const result = await newBill.save();
    // res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err._message);
  }
});

// Edit bill
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const allowedData = [
    "postalCode",
    "country",
    "city",
    "street",
    "phoneNumber",
    "countryCode",
    "name",
  ];
  try {
    if (req.params.id) {
      const updatedBill = await Billing.findOne({ userId: req.params.id });

      if (!updatedBill) return;

      const updatedAddress = updatedBill.address.find((address) => {
        return address._id.toString() === req.body.billId;
      });

      if (!updatedAddress) return;

      const filteredAddresses = updatedBill.address.filter((address) => {
        return address._id.toString() !== req.body.billId;
      });

      updatedAddress.postalCode = req.body.postalCode;
      updatedAddress.country = req.body.country;
      updatedAddress.city = req.body.city;
      updatedAddress.street = req.body.street;
      updatedAddress.phoneNumber = req.body.phoneNumber;
      updatedAddress.countryCode = req.body.countryCode;
      updatedAddress.name = req.body.name;

      const newAddressArray = [...filteredAddresses, updatedAddress];
      updatedBill.address = newAddressArray.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const result = await updatedBill.save();
      res.json(result);
    } else {
      res.status(401).json({ message: "Product Id is required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
