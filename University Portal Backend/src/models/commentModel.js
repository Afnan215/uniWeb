const mongoose = require("mongoose");
require("../../src/libs/dbconnection")

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

let comments = new mongoose.model("comment", commentSchema);

module.exports = comments

