import Yup from "yup";
export const userValidationSchema = Yup.object({
  email: Yup.string().email().trim().required().lowercase().max(55),
  password: Yup.string().required().trim(),
  firstName: Yup.string().required().trim().max(30),
  lastName: Yup.string().required().trim().max(30),
  gender: Yup.string().required().trim().oneOf(["male", "female", "others"]),
  role: Yup.string().required().trim().oneOf(["admin", "user"]),
});
export const loginUserValidationSchema = Yup.object({
  email: Yup.string().email().trim().required().lowercase(),
  password: Yup.string().required().trim(),
});
