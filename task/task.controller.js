import express from "express";
import {
  isNormalUser,
  isUser,
} from "../modules/middleware/authentication.middleware.js";
import validateMongoIdFromParams from "../modules/middleware/validate.mongo.id.js";
import validateReqBody from "../modules/middleware/validate.req.body.js";
import Task from "./task.model.js";
import { addTaskValidationSchema } from "./task.validation.js";
import checkMongoIdsEquality from "../modules/utils/mongo.id.equality.js";

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

// delete task
router.delete(
  "/task/delete/:id",
  isNormalUser,
  validateMongoIdFromParams,
  async (req, res) => {
    // extract task id from req.params
    const taskId = req.params.id;

    // find task using taskId
    const task = await Task.findById(taskId);
    // if not task found, throw error
    if (!task) {
      return res.status(404).send({ message: "Task does not exists." });
    }
    // check if loggedInUserId is owner of the task
    const isTaskOwner = checkMongoIdsEquality(task.userId, req.loggedInUserId);
    // if not owner, throw error
    if (!isTaskOwner) {
      return res.status(403).send({ message: "You are not the task creator." });
    }
    //  delete task
    await Task.findByIdAndDelete(taskId);
    // send res

    return res.status(200).send({ message: "Task Deleted Successfully." });
  },
);

// edit task
router.put(
  "/task/edit/:id",
  isNormalUser,
  validateMongoIdFromParams,
  validateReqBody(addTaskValidationSchema),
  async (req, res) => {
    // extract taskId form req.params
    const taskId = req.params.id;
    // find task using taskId
    const task = await Task.findOne({ _id: taskId });
    // if not task, throw error
    if (!task) {
      return res.status(404).send({ message: "Task does not exists." });
    }
    // check task ownership
    const isTaskOwner = checkMongoIdsEquality(task.userId, req.loggedInUserId);
    // if not task ownership, throw error
    if (!isTaskOwner) {
      return res
        .status(403)
        .send({ message: "You are not the creator of the task." });
    }
    // extract new values from req.body
    const newValues = req.body;
    // edit task
    await Task.updateOne(
      { _id: taskId },
      {
        $set: { ...newValues },
      },
    );
    // send res
    return res.status(200).send({ message: "Task Edited Successfully." });
  },
);

export default router;
