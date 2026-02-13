import express from "express";
import Task from "./task.model.js";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import {
  isNormalUser,
  isUser,
} from "../modules/middleware/authentication.middleware.js";
import validateReqBody from "../modules/middleware/validate.req.body.js";
import { addTaskValidationSchema } from "./task.validation.js";

const router = express.Router();

// list all tasks
router.get("/task/list", isUser, async (req, res) => {
  // find all task
  const tasks = await Task.find();

  // send res
  return res.status(200).send({ message: "Success", taskLists: tasks });
});

// add task
router.post(
  "/task/add",
  isNormalUser,
  validateReqBody(addTaskValidationSchema),
  async (req, res) => {
    // extract new task from req.body
    const newTask = req.body;
    newTask.userId = req.loggedInUserId;
    // save task

    await Task.create(newTask);

    // send res
    return res.status(200).send({ message: "Task Added Successfully..." });
  },
);

export default router;
