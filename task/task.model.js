import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 70,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    userId: {
      type: mongoose.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },

    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timeStamp: true }, // adds created by and updatedAt automatically
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
