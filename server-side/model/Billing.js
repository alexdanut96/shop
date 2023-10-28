const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillingSchema = new Schema(
  {
    userId: { type: String, required: true },
    address: [
      {
        postalCode: { type: Number, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", BillingSchema);
