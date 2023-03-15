const mongoose = require("mongoose");
const uuid = require("uuid");
module.exports = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      _id: { type: String, required: true, default: uuid.v4() },
      slug: { type: String, index: true, required: true, unique: true },
      title: { type: String, required: true },
      body: { type: String, required: true },
      category: String,
      tags: String,
      author: String,
    },
    { timestamps: true }
  )
);
