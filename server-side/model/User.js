const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    profilePicture: { type: String },
    phoneNumber: { type: Number },
    address: [
      {
        postalCode: { type: Number },
        country: { type: String },
        city: { type: String },
        street: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
