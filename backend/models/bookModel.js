const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publishYear: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Books", bookSchema);

module.exports = Book;
