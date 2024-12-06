const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },

  priority: {
    type: Boolean,
    required: true,
    default: false,
  },

  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
