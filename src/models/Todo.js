const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title dena zaroori hai!'],
      trim: true,
      maxlength: [100, 'Title zyada lamba nahi hona chahiye'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description 500 characters se zyada nahi'],
    },
    done: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);