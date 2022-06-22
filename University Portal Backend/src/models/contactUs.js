const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    subjects: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

contactUsSchema.index({ email: 1 });

let contactuser = new mongoose.model("contactUser", contactUsSchema);

module.exports = contactuser;
