const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bookRating: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
