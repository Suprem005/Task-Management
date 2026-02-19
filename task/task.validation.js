import Yup from "yup";
import { taskStatus } from "../modules/constant/general.constant.js";
export const addTaskValidationSchema = Yup.object({
  title: Yup.string().required().trim().max(70),
  description: Yup.string().required().trim().min(10).max(1000),
  status: Yup.string().required().oneOf(taskStatus),
  dueDate: Yup.date().required(),
});

export const paginationDataValidaitonSchema = Yup.object();
