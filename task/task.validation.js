import Yup from "yup";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  taskStatus,
} from "../modules/constant/general.constant.js";
export const addTaskValidationSchema = Yup.object({
  title: Yup.string().required().trim().max(70),
  description: Yup.string().required().trim().min(10).max(1000),
  status: Yup.string().required().oneOf(taskStatus),
  dueDate: Yup.date().required(),
});

export const paginationDataValidationSchema = Yup.object({
  page: Yup.number().min(1).integer().default(DEFAULT_PAGE),
  limit: Yup.number().min(1).integer().default(DEFAULT_LIMIT),
  searchText: Yup.string().trim().notRequired(),
});
