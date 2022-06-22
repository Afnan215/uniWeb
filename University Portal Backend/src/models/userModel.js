const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ email: 1 });

let registerUser = new mongoose.model("user", userSchema);

module.exports = registerUser;
