import mongoose from "mongoose";
import { taskStatus } from "../modules/constant/general.constant.js";

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
      enum: taskStatus,
      default: "pending",
    },

    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }, // adds created by and updatedAt automatically
);

// to remove userId field in response when the details are converted to JSON from DB

// taskSchema.methods.toJSON = function () {
//   var obj = this.toObject();
//   delete obj.userId;
//   return obj;
// };

// create model
const Task = mongoose.model("Task", taskSchema);

export default Task;
